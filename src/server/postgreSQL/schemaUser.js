const query = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  sexe VARCHAR,
  sexualorientation VARCHAR DEFAULT 'bisexual',
  bio TEXT,
  age INTEGER,
  interest TEXT,
  photo_1 VARCHAR DEFAULT '/uploads/null',
  photo_2 VARCHAR DEFAULT '/uploads/null',
  photo_3 VARCHAR DEFAULT '/uploads/null',
  photo_4 VARCHAR DEFAULT '/uploads/null',
  photo_5 VARCHAR DEFAULT '/uploads/null',
  latitude VARCHAR,
  longitude VARCHAR,
  ip VARCHAR,
  blocked TEXT,
  popularity INTEGER DEFAULT '0',
  confirmed BOOLEAN DEFAULT FALSE,
  connected BOOLEAN DEFAULT FALSE,
  postal_code INTEGER,
  socket_id VARCHAR,
  cotime TIMESTAMPTZ
);`;
// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
