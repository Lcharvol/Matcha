import pgp from 'pg-promise';
import UserSchema from './schemaUser';

const init = async (ctx) => {
  const { config: { postgres: config, configPgp } } = ctx;
  const pgConnector = pgp(configPgp);
  const db = pgConnector(config);
  const client = await db.connect();
  await UserSchema(client);
  return { ...ctx, db: client };
};

export default init;
