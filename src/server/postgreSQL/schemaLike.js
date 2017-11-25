const query = `CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  to_user NUMERIC NOT NULL,
  from_user NUMERIC NOT NULL,
  push BOOLEAN DEFAULT FALSE,
);`;

// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
