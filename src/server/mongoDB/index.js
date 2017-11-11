import { MongoClient } from 'mongodb';
import debug from 'debug';

const logger = debug('matcha:server/mongoDB');

const init = async (ctx) => {
  console.log(ctx);
  const { db: { name } } = ctx.config;
  try {
    const db = await MongoClient.connect(`mongodb://localhost:27017/${name}`);
    logger('mongoDB is now connected => ctx.db');
    // ctx.dUsers = db.collection('users');
    return { ...ctx, db };
  } catch (err) {
    throw new Error('Error while trying to connect mongo');
  }
};

export const disconnectMongoDb = async (ctx) => {
  try {
    await ctx.db.close();
    logger('mongoDB is now disconnected');
  } catch (err) {
    throw new Error('Error while trying to connect mongo');
  }
};

export default init;
