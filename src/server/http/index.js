import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan-debug';
import multer from 'multer';
import path from 'path';

import switchEvent from '../../lib/event';
import { getToken, getUserFromToken, sendTokenResetPassword, checkToken, checkAuth } from './services/hooks/token';
import { validateLoginForm, checkIfConfirmedAndReturnUser } from './services/hooks/user';
import confirmEmail from './services/confirmEmail';
import addImg from './services/addImg';
import resetPassword from './services/resetPassword';
import login from './services/login';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const bindCtx = (ctx) => (req, res, next) => {
  req.ctx = ctx;
  next();
};

const upload = multer({
  dest: path.join(__dirname, '../../../public/uploads/'),
  limits: {
    fileSize: 2000000,
    files: 5,
  },
});

const init = ctx => new Promise(resolve => {
  const app = express();
  const { server: { host, port }, secretSentence } = ctx.config;

  app
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger('matcha:http', 'dev'))
    .use(cors())
    .use(bindCtx(ctx));

  app
    .get('/ping', (req, res) => res.json({ ping: 'pong' }))
    .get('/confirm_email', getToken, getUserFromToken, confirmEmail)
    .post('/reset_password', getToken, checkToken, resetPassword)
    .get('/lost_password', sendTokenResetPassword)
    // .get('/login', validateLoginForm, checkIfConfirmedAndReturnUser, login)
    .use('/api', switchEvent)
    .post(
      '/add_img', upload.fields([{ name: 'imgs', maxCount: 4 }, { name: 'imgProfile', maxCount: 1 }]),
      getToken, checkAuth(secretSentence), addImg,
    );

  const httpServer = app.listen(port, host, () => {
    httpServer.url = getUrl(httpServer);
    console.log(`Connected at this address: ${httpServer.url}`); // eslint-disable-line no-console
    resolve({ ...ctx, http: httpServer });
  });
});

export default init;
