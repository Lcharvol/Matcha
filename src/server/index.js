import debug from 'debug';

import config from '../../config/server';

import initHttp from './http';
import initPostgresSQL from './postgreSQL';
// import initServices from './services';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    let ctx = await initPostgresSQL({ config, startTime: new Date() }); // eslint-disable-line no-shadow
    // ctx = await initServices(ctx);
    ctx = await initHttp(ctx);
    logger(`Server started! ${ctx.startTime}`);
  } catch (err) {
    logger(err.stack);
  }
};

init();
