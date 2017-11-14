import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import logger from 'morgan-debug';
import multer from 'multer';
import path from 'path';

import switchEvent from '../../lib/event';
import { getToken, getUserFromToken, sendTokenResetPassword, checkToken, checkAuth } from './services/hooks/token';
import { validateLoginForm, checkIfConfirmedAndReturnUser } from './services/hooks/user';
import confirmEmail from './services/routes/confirmEmail';
import addImg from './services/routes/addImg';
import resetPassword from './services/routes/resetPassword';
import login from './services/routes/login';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const bindCtx = (ctx) => (req, res, next) => {
  req.ctx = ctx;
  next();
};

const bindError = (req, res, next) => {
  req.Err = (msg) => {
    const { stack } = new Error();
    const regex = /\(.*[Mm]atcha\/src\/server\/(.*):(\d*):(\d*)\)/igm;
    const matches = regex.exec(stack.split('\n')[2]);
    const [, file, line] = matches;
    const log = debug(`matcha:${file}:${line}`);
    log(`DETAILS: ${msg}`);
    res.status(201);
    res.json({ details: msg });
  };
  next();
};

const bindLogger = (req, res, next) => {
  req.log = (msg) => {
    const { stack } = new Error();
    const regex = /\(.*[Mm]atcha\/src\/server\/(.*):(\d*):(\d*)\)/igm;
    const matches = regex.exec(stack.split('\n')[2]);
    const [, file, line] = matches;
    const log = debug(`matcha:${file}:${line}`);
    log(msg);
  };
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
  const { server: { host, port } } = ctx.config;

  app
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger('matcha:http', 'dev'))
    .use(cors())
    .use(bindCtx(ctx))
    .use(bindLogger)
    .use(bindError);

  app
    .get('/ping', (req, res) => res.json({ ping: 'pong' }))
    .get('/confirm_email', getToken, getUserFromToken, confirmEmail)
    .post('/reset_password', getToken, checkToken, resetPassword)
    .get('/lost_password', sendTokenResetPassword)
    .post('/login', validateLoginForm, checkIfConfirmedAndReturnUser, login)
    .use('/api', getToken, switchEvent)
    .post(
      '/add_img', upload.fields([{ name: 'pictures', maxCount: 4 }, { name: 'profile_picture', maxCount: 1 }]),
      getToken, checkAuth, addImg,
    );

  const httpServer = app.listen(port, host, () => {
    httpServer.url = getUrl(httpServer);
    console.log(`Connected at this address: ${httpServer.url}`); // eslint-disable-line no-console
    resolve({ ...ctx, http: httpServer });
  });
});

export default init;
