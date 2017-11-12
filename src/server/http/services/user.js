import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import debug from 'debug';
// import jwt from 'jsonwebtoken';

import User from '../../models/User';
import { validateRegisterForm, sendConfirmEmail, getIp, getLocalisation } from './hooks/user';

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
};

const init = {
  name: 'user',
  service,
  before: {
    post: [validateRegisterForm, getIp, getLocalisation],
  },
  after: {
    post: [sendConfirmEmail],
  },
};

export default init;
