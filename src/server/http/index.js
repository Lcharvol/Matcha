import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketIo from 'socket.io';
import _ from 'lodash';

import switchEvent from '../../lib/event';
import User from '../models/User';
import { getUrl, bindError, bindLogger, bindCtx, uploadImage } from './helpers';
import { getToken, checkAuth, getUserFromTokenWithoutErr } from '../services/hooks/token';
import addImg from './routes/addImg';

const bindSocketIO = (io, currentSocketId, socketIdToDelete, tmp) => async (req, res, next) => {
  res.io = io;
  if (!currentSocketId[0] || !req.user || req.originalUrl === '/api/user/connected' || tmp[0] === currentSocketId[0]) return next();
  const { db } = req.ctx;
  const { socket_id: socketId } = req.user;
  tmp[0] = currentSocketId[0];
  if (_.isEmpty(socketId) || (socketId.length > 0 && !_.includes(socketId, currentSocketId[0])))
    await User.addSocket.bind({ db })(currentSocketId[0], Number(req.user.id));
  if (socketIdToDelete[0])
    await User.deleteSocket.bind({ db })(socketIdToDelete[0], Number(req.user.id));
  next();
};

const init = async ctx => {
  const app = await express();
  const { server: { host, port } } = ctx.config;

  const httpServer = await app.listen(port, host, () => {
    httpServer.url = getUrl(httpServer);
    console.log(`Connected at this address: ${httpServer.url}`); // eslint-disable-line no-console
  });

  const io = socketIo(httpServer);
  const currentSocketId = [];
  const socketIdToDelete = [];
  const tmp = [];
  io.on('connection', async socket => {
    if (!socket.handshake.query.matchaToken) return null;
    currentSocketId[0] = socket.id;
    // console.log('user connected   ', socket.id);
    socket.on('disconnect', async () => {
      // console.log('user disconnected', socket.id);
      socketIdToDelete[0] = socket.id;
    });
  });

  await app
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
    .use(bindCtx(ctx))
    .use(bindLogger)
    .use(getToken)
    .use(getUserFromTokenWithoutErr)
    .use(bindSocketIO(io, currentSocketId, socketIdToDelete, tmp))
    .use(bindError);

  await app
    .use('/api', switchEvent)
    .post('/api/user/add_img', getToken, checkAuth, uploadImage, addImg);
  return ({ ...ctx, http: httpServer });
};

export default init;
