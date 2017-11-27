import jwt from 'jsonwebtoken';

import User from '../../../models/User';

const getToken = async (req, res, next) => {
  const auth = req.get('authorization');
  const token =
    (auth && auth.length > 15 && auth.substr(0, 7) === 'Bearer ') ? auth.substr(7) : undefined
    || req.cookies.matchaToken
    || req.query.matchaToken
    || req.body.matchaToken;
  req.matchaToken = token;
  next();
};

const checkAuth = async (req, res, next) => {
  try {
    const {
      matchaToken,
      ctx: {
        config: { secretSentence: secret },
        db,
      },
    } = req;
    if (!matchaToken) {
      return req.Err('no token provided');
    }
    jwt.verify(matchaToken, secret);
    const { sub: id } = jwt.decode(matchaToken);
    const user = await User.load.bind({ db })(id);
    req.user = user;
    next();
  } catch (err) {
    req.Err('Failed to auth');
  }
};

const getUserFromToken = async (req, res, next) => {
  const { config: { secretSentence }, db } = req.ctx;
  const { matchaToken } = req;
  if (!matchaToken) {
    return req.Err('no token provided');
  }
  try {
    const dataDecoded = jwt.verify(matchaToken, secretSentence);
    const user = await User.load.bind({ db })(dataDecoded.sub);
    req.user = user;
    if (user.confirmed) {
      return req.Err('already confirmed, no redirect for you !');
    }
    next();
  } catch (err) {
    req.Err('Wrong token provide');
  }
};

const checkToken = async (req, res, next) => {
  const { db } = req.ctx;
  try {
    const { matchaToken } = req;
    if (!matchaToken) {
      return req.Err('no token provided');
    }
    const { sub: id } = jwt.decode(matchaToken);
    req.tokenId = id;
    const user = await User.load.bind({ db })(id);
    jwt.verify(matchaToken, user.password);
    req.secretPassword = user.password;
    next();
  } catch (err) {
    req.Err('wrong token provided');
  }
};

export {
  getToken,
  getUserFromToken,
  checkToken,
  checkAuth,
};
