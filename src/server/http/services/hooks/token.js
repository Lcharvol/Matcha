import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import mailer from '../../../../lib/mailer';

const getToken = async (req, res, next) => {
  const token = req.cookies.matchaToken || req.query.matchaToken;
  req.matchaToken = token;
  next();
};

const checkAuth = (secret) => async (req, res, next) => {
  try {
    const {
      matchaToken,
      ctx: {
        db,
      },
    } = req;
    if (!matchaToken) {
      res.status = 201;
      res.json({ details: 'no token provided' });
    }
    jwt.verify(matchaToken, secret);
    const { sub } = jwt.decode(matchaToken);
    req.tokenId = sub;
    const user = await User.load.bind({ db })(sub);
    req.user = user;
    next();
  } catch (err) {
    res.status = 201;
    res.json({ details: 'Failed Auth' });
  }
};

const getUserFromToken = async (req, res, next) => {
  const { config: { secretSentence }, db } = req.ctx;
  const { matchaToken } = req;
  if (!matchaToken) {
    res.status = 201;
    res.json({ details: 'no token provided' });
  }
  try {
    const dataDecoded = jwt.verify(matchaToken, secretSentence);
    const user = await User.load.bind({ db })(dataDecoded.sub);
    req.user = user;
    if (user.confirmed) {
      res.status = 201;
      res.json({ details: 'already confirmed, noredirect for you !' });
    }
    next();
  } catch (err) {
    res.status = 201;
    res.json({ details: 'wrong token provided' });
  }
};

const sendTokenResetPassword = async (req, res) => {
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
    res.status = 201;
    res.json({ details: 'Failed to authenticate' });
  }
};

const checkToken = async (req, res, next) => {
  const { db } = req.ctx;
  try {
    const { matchaToken } = req;
    if (!matchaToken) {
      res.status = 201;
      res.json({ details: 'no token provided' });
    }
    const { sub: id } = jwt.decode(matchaToken);
    req.tokenId = id;
    const user = await User.load.bind({ db })(id);
    jwt.verify(matchaToken, user.password);
    req.secretPassword = user.password;
    next();
  } catch (err) {
    res.status = 201;
    res.json({ details: 'wrong token provided' });
  }
};

export {
  getToken,
  getUserFromToken,
  sendTokenResetPassword,
  checkToken,
  checkAuth,
};
