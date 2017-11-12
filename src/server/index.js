import debug from 'debug';

import config from '../../config/server';
import configClient from '../../config/client';

import initHttp from './http';
import initPostgresSQL from './postgreSQL';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    let ctx = await initPostgresSQL({ config: { ...config, urlClient: configClient.serverUrl, startTime: new Date() } }); // eslint-disable-line no-shadow
    ctx = await initHttp(ctx);
    logger(`Server started! ${ctx.config.startTime}`);
  } catch (err) {
    logger(err.stack);
  }
};

init();
