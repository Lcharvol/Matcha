import pgp from 'pg-promise';
import debug from 'debug';

const logger = debug('matcha:server/mongoDB');

const init = async ({ postgres: config, configPgp }) => {
  const pgConnector = pgp(configPgp);
  const db = pgConnector(config);
  const client = await db.connect();
  return { db: client };
};

export default init;
