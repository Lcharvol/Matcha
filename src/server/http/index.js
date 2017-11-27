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

const bindSocketIO = (io, currentSocketId, socketIdToDelete) => async (req, res, next) => {
  res.io = io;
  if (!currentSocketId || !req.user) return next();
  const { db } = req.ctx;
  const { socket_id: socketId } = req.user;
  console.log('bindSocketIO');
  if (!socketId || (socketId && !_.includes(_.split(socketId, ','), currentSocketId)))
  {
    console.log(_.split(socketId, ','));
    console.log(currentSocketId);
    await User.addSocket.bind({ db })(currentSocketId, Number(req.user.id));
  }
  if (socketIdToDelete)
    await User.deleteSocket.bind({ db })(socketIdToDelete, Number(req.user.id));
  // if (req.user && req.user.socket_id !== currentSocketId[0])
  //   await User.update.bind({ db })({ socket_id: currentSocketId[0] }, Number(req.user.id));
  // if (req.user && req.user.socket_id === socketIdToDelete[0])
  //   await User.update.bind({ db })({ socket_id: '' }, Number(req.user.id));
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
  io.on('connection', async socket => {
    if (!socket.handshake.query.matchaToken) return null;
    currentSocketId[0] = socket.id;
    console.log('user connected   ', socket.id);
    socket.on('disconnect', async () => {
      console.log('user disconnected', socket.id);
      socketIdToDelete[0] = socket.id;
    });
  });

  await app
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // .use(logger('matcha:http', 'dev'))
    .use(cors())
    .use(bindCtx(ctx))
    .use(bindLogger)
    .use(getToken)
    .use(getUserFromTokenWithoutErr)
    .use(bindSocketIO(io, currentSocketId, socketIdToDelete))
    .use(bindError)

  await app
    .use('/api', switchEvent)
    .post('/add_img', uploadImage, getToken, checkAuth, addImg);
  return ({ ...ctx, http: httpServer });
};

export default init;
