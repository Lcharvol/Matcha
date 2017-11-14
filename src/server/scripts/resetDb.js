import debug from 'debug';

import config from '../../../config/server';
import configClient from '../../../config/client';

import initPostgresSQL from '../postgreSQL';

const logger = debug('matcha:server/index.js');

const query = 'DROP TABLE "users"';

const init = async () => {
  try {
    console.log('ok');
    const ctx = await initPostgresSQL({ config: { ...config, urlClient: configClient.serverUrl, startTime: new Date() } }); // eslint-disable-line no-shadow
    console.log(ctx.db);
    ctx.db.none(query);
  } catch (err) {
    logger(err.stack);
  }
};

init();
