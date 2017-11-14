import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import _ from 'lodash';
// import jwt from 'jsonwebtoken';

import User from '../../models/User';
import { validateRegisterForm, sendConfirmEmail, getIp, getLocalisation, getInfoToUpdate } from './hooks/user';
import { checkIfNotBlocked } from './hooks/block';
import { checkAuth } from './hooks/token';

const service = {
  async post(req, res) {
    const user = { ...R.pick(req.registerInputName, req.body), ...req.user };
    const { db } = req.ctx;
    try {
      const newUser = await bcrypt
        .hash(req.body.password, 10)
        .then(hashedPassword =>
          User.add.bind({ db })(R.assoc('password', hashedPassword, user)));
      req.user = newUser;
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
      const info = R.filter((single) => {
        if (typeof single === 'object' && single.length !== 0) return true;
        if (typeof single === 'string' && single !== '') return true;
      }, infoToUpdate);
      if (info.password) {
        info.password = await bcrypt.hash(info.password, 10);
      }
      await User.update.bind({ db })(info, Number(id));
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
  async get(req, res) {
    res.json({ details: R.omit(['password'], req.user) });
  },
  async get$id(req, res) {
    try {
      const { ctx: { db } } = req;
      const { params: { id } } = req;
      const user = await User.load.bind({ db })(id);
      res.json({ details: R.omit(['password'], user) });
    } catch (err) {
      req.Err('Failed to get the user');
    }
  },
  async get$all(req, res) {
    try {
      const { ctx: { db } } = req;
      const users = await User.getAll.bind({ db })();
      const newUsers = users.map((item, value) => {
        return R.omit(['password'], item);
      });
      req.Err(newUsers);
        // console.log(_.reduce(users, (acc, item, key) => ({ ...acc, item: R.omit(['password'], item) })));
    } catch (err) {
      req.Err('Failed to get users');
    }
  },
};

const init = {
  name: 'user',
  service,
  before: {
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [checkAuth],
    get: [checkAuth],
    get$id: [checkAuth],
    get$all: [checkAuth],
  },
  after: {
    get$all: [checkIfNotBlocked],
  },
};

export default init;
