import debug from 'debug';

import config from '../../config/server';
import configClient from '../../config/client';

import initHttp from './http';
import initPostgresSQL from './postgreSQL';
import { resetDb, loadUsers } from './scripts';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    let ctx = await initPostgresSQL({ config: { ...config, urlClient: configClient.serverUrl, startTime: new Date() } }); // eslint-disable-line no-shadow
    if (process.env.RESET_DB) return resetDb(ctx.db);
    if (process.env.LOAD_USERS) return loadUsers(ctx.db);
    ctx = await initHttp(ctx);
    logger(`Server started! ${ctx.config.startTime}`);
  } catch (err) {
    logger(err.stack);
  }
};

init();
