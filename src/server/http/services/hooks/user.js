import jwt from 'jsonwebtoken';
import debug from 'debug';
import geoip from 'geoip-lite';
// import { schemaRegister, schemaLogin } from '../../../lib/validator';
import mailer from '../../../../lib/mailer';
import { schemaRegister, schemaLogin } from '../../../../lib/validators';
import User from '../../../models/User'; // eslint-disable-line

const logger = debug('matcha:server/hooks.js');

export const validateRegisterForm = async (req, res, next) => {
  try {
    const user = req.body;
    await schemaRegister.validate(user);
    req.registerInputName = schemaRegister._nodes;
    next();
  } catch (err) {
    logger(err);
    res.status = 201;
    res.json({ details: err.errors });
  }
};

export const validateLoginForm = async (req, res, next) => {
  try {
    const user = req.body;
    await schemaLogin.validate(user);
    req.registerInputName = schemaRegister._nodes;
    next();
  } catch (err) {
    logger(err);
    res.status = 201;
    res.json({ details: err.errors });
  }
};

export const checkIfConfirmedAndReturnUser = async (req, res, next) => {
  const { login } = req.body;
  const { db } = req.ctx;
  try {
    const user = await User.getByEmail.bind({ db })(login);
    if (!user.confirmed) {
      logger('Not confirmed!');
      res.status = 201;
      res.json({ details: 'Not confirmed!' });
    }
    req.user = user;
    next();
  } catch (err) {
    logger('Not confirmed!');
    res.status = 201;
    res.json({ details: 'Not confirmed!' });
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
