const query = `CREATE TABLE IF NOT EXISTS chat (
  id SERIAL PRIMARY KEY,
  user_send INTEGER NOT NULL,
  user_receive INTEGER NOT NULL,
  date TIMESTAMPTZ,
  msg VARCHAR
);`;

// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
