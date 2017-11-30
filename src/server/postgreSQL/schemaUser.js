const query = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  sexe VARCHAR,
  sexual_orientation VARCHAR DEFAULT 'bisexual',
  bio TEXT,
  age INTEGER,
  interest TEXT[] DEFAULT '{}',
  pic1 VARCHAR DEFAULT '/uploads/null',
  pic2 VARCHAR DEFAULT '/uploads/null',
  pic3 VARCHAR DEFAULT '/uploads/null',
  pic4 VARCHAR DEFAULT '/uploads/null',
  profile_picture VARCHAR DEFAULT '/uploads/null',
  latitude FLOAT,
  longitude FLOAT,
  ip INET,
  blocked TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT '0',
  confirmed BOOLEAN DEFAULT FALSE,
  connected BOOLEAN DEFAULT FALSE,
  postal_code INTEGER,
  socket_id TEXT[] DEFAULT '{}',
  cotime TIMESTAMPTZ
);`;
// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

const loadSchema = async (db) => db.none(query);

export default loadSchema;
