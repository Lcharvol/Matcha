import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
import cors from 'kcors';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = ctx => new Promise(resolve => {
  const app = new Koa();
  const router = new Router();
  const { server: { host, port } } = ctx.config;
  router
    .get('/ping', ctx => ctx.body = ({ ping: 'pong' })) // eslint-disable-line
    // .post('/user', getToken, checkToken, resetPassword)

  app
    .use(bodyParser())
    .use(logger())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
  const httpServer = app.listen(port, host, () => {
    httpServer.url = getUrl(httpServer);
    console.log(`Connected at this address: ${httpServer.url}`); // eslint-disable-line no-console
    resolve({ ...ctx, http: httpServer });
  });
});

export default init;
