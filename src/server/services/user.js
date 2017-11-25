import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';

import mailer from '../../lib/mailer';
import User from '../models/User';
import { validateRegisterForm,
  validateLoginForm,
  checkIfConfirmedAndReturnUser,
  sendConfirmEmail,
  getIp,
  getLocalisation,
  checkIfNotBlocked,
  getInfoToUpdate } from './hooks/user';
import { schemaLogin } from '../../lib/validators';
import { checkAuth, getUserFromToken, checkToken } from './hooks/token';
import { getFilterAndSort, getFilterGeoAndInterest } from './hooks/location';

const service = {
  // CRUD
  async post(req, res) {
    const { db } = req.ctx;
    try {
      const user = { ...R.pick(req.registerInputName, req.body), ...req.user };
      const newUser = await bcrypt
        .hash(req.body.password, 10)
        .then(hashedPassword =>
          User.add.bind({ db })(R.assoc('password', hashedPassword, user)));
      req.user = newUser;
      await User.scoring.bind({ db })(req.user);
      sendConfirmEmail(newUser, req.ctx);
      res.json({ details: 'Succesfully register, please check your mail' });
    } catch (err) {
      req.Err('User already register');
    }
  },
  async put(req, res) {
    try {
      const { id } = req.user;
      const { infoToUpdate } = req;
      const { ctx: { db } } = req;
      console.log(infoToUpdate);
      const info = R.filter((single) => {
        if (typeof single === 'object' && single.length !== 0) return true;
        if (typeof single === 'string' && single !== '') return true;
        if (typeof single === 'boolean') return true;
      }, infoToUpdate);
      if (info.password) {
        info.password = await bcrypt.hash(info.password, 10);
      }
      const user = await User.update.bind({ db })(info, Number(id));
      await User.scoring.bind({ db })(user);
      res.json({ details: 'Succesfully update your info', more: Object.keys(info) });
    } catch (err) {
      req.Err('Failed To upload your info');
    }
  },
  async delete(req, res) {
    try {
      const { ctx: { db }, user } = req;
      await User.delete.bind({ db })(Number(user.id));
      res.json({ details: 'Succesfully delete' });
    } catch (err) {
      req.Err('Failed to delete', req.user.login);
    }
  },
  async get(req, res, next) {
    const { ctx: { db }, user: { id } } = req;
    const { query: { id: idRequest } } = req;
    try {
      if (idRequest) {
        const _user = await User.load.bind({ db })(idRequest);
        req.userRequested = R.omit(['password'], _user);
      } else {
        return res.json({ details: R.omit(['password'], req.user) });
      }
      next();
    } catch (err) {
      req.Err('Failed to get the user');
    }
  },

  // OTHER ACTIONS
  async getAll(req, res, next) {
    const { ctx: { db }, user: { id } } = req;
    try {
      const users = await User.getAll.bind({ db })(req.filterString, req.sortString);
      req.users = users.filter((item) => item.id !== id).map(v => R.omit(['password'], v));
      next();
    } catch (err) {
      console.log(err);
      req.Err('Failed to get the user');
    }
  },
  async login(req, res) {
    try {
      const { password: inputPassword } = req.body;
      const { ctx: { config: { secretSentence, expiresIn }, db }, user } = req;
      await bcrypt.compare(inputPassword, user.password);
      const wasConnected = user.connected;
      await User.update.bind({ db })({ connected: true, cotime: new Date() }, Number(req.user.id));
      if (!wasConnected) res.io.emit('userConnected', user.login);
      res.json({ matchaToken: jwt.sign({ sub: user.id }, secretSentence, { expiresIn }) });
    } catch (err) {
      const message = err.message === 'invalid' ? 'wrong password' : 'failed to auth';
      req.Err(message, err);
    }
  },
  async confirmEmail(req, res) {
    try {
      const {
        db,
        config: { urlClient },
      } = req.ctx;
      const { id } = req.user;
      const user = await User.update.bind({ db })({ confirmed: true }, Number(id));
      res.redirect(`${urlClient}?login=${user.login}`);
    } catch (err) {
      req.Err(err.message);
    }
  },
  async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { db } = req.ctx;
      await schemaLogin.fields.password.validate(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.update.bind({ db })({ password: hashedPassword }, req.tokenId);
      res.status = 200;
      res.json({ details: 'password has been updated!' });
    } catch (err) {
      req.Err('wrong format');
    }
  },
  async lostPassword(req, res) {
    const { config: { routes: { resetPassword }, urlClient }, db } = req.ctx;
    const { email } = req.query;
    try {
      const user = await User.EmailVerif.bind({ db })(email);
      const token = jwt.sign({ sub: user.id }, user.password);
      mailer(
        user.email,
        'Reset Password - Matcha',
        `Registration Code: ${urlClient}${resetPassword}?matchaToken=${token}`,
      );
      res.json({ details: 'Email sent thank you' });
    } catch (err) {
      req.Err('Failed to authenticate');
    }
  },
  async getConnectedUser(req, res) {
    const { ctx: { db } } = req;
    try {
      const connectedUser = await User.getConnectedUser.bind({ db })();
      return res.json({ details: connectedUser.count });
    } catch (err) {
      req.Err('Failed to get connected user');
    }
  },
};

// getAll: [checkAuth, loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers],
const init = {
  name: 'user',
  service,
  before: {
    get: [checkAuth],
    getAll: [checkAuth, getFilterAndSort],
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [checkAuth],
    login: [validateLoginForm, checkIfConfirmedAndReturnUser],
    confirmEmail: [getUserFromToken],
    resetPassword: [checkToken],
  },
  after: {
    get: [checkIfNotBlocked],
    getAll: [getFilterGeoAndInterest],
  },
};

export default init;
