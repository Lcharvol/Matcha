import jwt from 'jsonwebtoken';
import geoip from 'geoip-lite';
import _ from 'lodash';
import mailer from '../../../../lib/mailer';
import { schemaRegister, schemaLogin, schemaEditProfil } from '../../../../lib/validators';
import User from '../../../models/User'; // eslint-disable-line

export const getInfoToUpdate = async (req, res, next) => {
  const inputUpdate = req.body;
  try {
    await schemaEditProfil.validate(inputUpdate);
    const infoCleaned = _.pick(inputUpdate, schemaEditProfil._nodes);
    if (_.isEmpty(infoCleaned)) {
      return req.Err('no one valid champ');
    }
    req.infoToUpdate = infoCleaned;
    next();
  } catch (err) {
    req.Err(err.errors);
  }
};

export const validateRegisterForm = async (req, res, next) => {
  try {
    const user = req.body;
    await schemaRegister.validate(user);
    req.registerInputName = schemaRegister._nodes;
    next();
  } catch (err) {
    req.Err(err.errors);
  }
};

export const validateLoginForm = async (req, res, next) => {
  try {
    const user = req.body;
    await schemaLogin.validate(user);
    req.registerInputName = schemaRegister._nodes;
    next();
  } catch (err) {
    req.Err(err.errors);
  }
};


export const checkIfConfirmedAndReturnUser = async (req, res, next) => {
  const { login } = req.body;
  const { db } = req.ctx;
  try {
    const user = await User.getByLogin.bind({ db })(login);
    if (!user.confirmed) return req.Err('Not Confirmed!');
    req.user = user;
    next();
  } catch (err) {
    req.Err('No account found!');
  }
};

export const sendConfirmEmail = async (user, ctx) => {
  const { id, email } = user;
  const {
    config: {
      secretSentence, expiresIn, server, routes: { confirmEmail },
    },
  } = ctx;
  const getUrl = `http://${server.host}:${server.port}`;
  const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
  mailer(
    email,
    'Confirmation Email - Matcha',
    `Hello, please click here to confirm your email:  ${getUrl}${confirmEmail}?matchaToken=${token}`,
  );
};

export const getIp = (req, res, next) => {
  req.user = {};
  const { connection: { remoteAddress } } = req;
  let ip = remoteAddress;
  if (ip === '127.0.0.1' || ip === '::1' || !ip) ip = '62.210.34.191';
  req.user.ip = ip;
  next();
};

export const getLocalisation = (req, res, next) => {
  const { ip } = req.user;
  const geo = geoip.lookup(ip);
  const range = { latitude: geo.ll[0], longitude: geo.ll[1] };
  const userWithRange = Object.assign(req.user, range);
  req.user = userWithRange;
  next();
};

