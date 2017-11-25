/* eslint-disable */
import pgp from 'pg-promise';
import UserSchema from './schemaUser';

const pingUserConnected = async (db) => {
  await db.any(`UPDATE users SET connected = false WHERE now() - cotime > interval '60 sec'`);
};

const init = async (ctx) => {
  const { config: { postgres: config, configPgp } } = ctx;
  const pgConnector = pgp(configPgp);
  const db = await pgConnector(config);
  const client = await db.connect();
  await UserSchema(client);
  setInterval(() => pingUserConnected(db), 1000); // 10000
  return { ...ctx, db: client };
};

export default init;
