const query = `CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  user_send_like INTEGER NOT NULL,
  user_receive_like INTEGER NOT NULL,
  date TIMESTAMPTZ,
  push BOOLEAN DEFAULT FALSE
);`;

// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
