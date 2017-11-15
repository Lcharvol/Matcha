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
  photo_1 VARCHAR,
  photo_2 VARCHAR,
  photo_3 VARCHAR,
  photo_4 VARCHAR,
  photo_5 VARCHAR,
  latitude VARCHAR,
  longitude VARCHAR,
  ip VARCHAR,
  blocked TEXT,
  popularity INTEGER DEFAULT '0',
  confirmed BOOLEAN DEFAULT FALSE
);`;
// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
