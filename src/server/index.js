import debug from 'debug';

import config from '../../config/server';
import configClient from '../../config/client';

import initHttp from './http';
import initPostgresSQL from './postgreSQL';
import { resetDb, loadUsers, loadChat, loadLike } from './postgreSQL/scriptDb';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    let ctx = await initPostgresSQL({ config: { ...config, urlClient: configClient.serverUrl, startTime: new Date() } }); // eslint-disable-line no-shadow
    if (process.env.RESET_DB) return resetDb(ctx.db);
    if (process.env.LOAD_USERS) {
      await loadUsers(ctx.db);
      await loadChat(ctx.db);
      await loadLike(ctx.db);
      return process.exit();
    }
    ctx = await initHttp(ctx);
    logger(`Server started at ${ctx.config.startTime.toString().substr(0, 25)}`);
  } catch (err) {
    logger(err.stack);
  }
};

init();
