import jwt from 'jsonwebtoken';

import User from '../../../models/User';
import mailer from '../../../../lib/mailer';
export const checkIfNotBlocked = async (req, res, next) => {
  // try {
  //   const user = req.body;
  //   await schemaRegister.validate(user);
  //   req.registerInputName = schemaRegister._nodes;
  //   next();
  // } catch (err) {
  //   req.Err(err.errors);
  // }
};
