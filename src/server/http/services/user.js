import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import debug from 'debug';
// import jwt from 'jsonwebtoken';

import User from '../../models/User';
import { validateRegisterForm, sendConfirmEmail, getIp, getLocalisation, getInfoToUpdate } from './hooks/user';
import { checkAuth } from './hooks/token';


const logger = debug('matcha:server/service/user.js');
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
      logger(err.message);
      res.status = 201;
      res.json({ details: 'User already register' });
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
      logger(err.message);
      res.status = 201;
      res.json({ details: 'Failed To upload your info.s' });
    }
  },
  async delete$id(req, res) {
    try {
      const { ctx: { db } } = req;
      const { id } = req.id;
      await User.delete.bind({ db })(Number(id));
      res.json({ details: 'Succesfully delete' });
    } catch (err) {
      logger(err.message);
      res.status = 201;
      res.json({ details: 'Failed to delete', more: req.user.login });
    }
  },
  async get$id(req, res) {
    console.log('postId');
    res.json({ details: 'fuck' });
  },
};

const init = {
  name: 'user',
  service,
  before: {
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [checkAuth],
  },
  after: {
    post: [sendConfirmEmail],
  },
};

export default init;
