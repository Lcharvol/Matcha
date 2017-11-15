import pgpConnector from 'pg-promise';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const pgp = pgpConnector({ capSQL: true });

const scoreTable = {
  login: 5,
  email: 5,
  firstname: 5,
  lastname: 5,
  sexe: 5,
  sexualorientation: 5,
  bio: 10,
  age: 5,
  interest: 11,
  photo_1: 13,
  photo_2: 6,
  photo_3: 6,
  photo_4: 6,
  photo_5: 6,
  confirmed: 10,
};

const User = {
  scoring(user) {
    const { id } = user;
    const score = _.reduce(user, (acc, item, key) => {
      if (_.includes(key, scoreTable)) return (acc + scoreTable[key]);
      return acc;
    }, 0);
    console.log(score);
    console.log(user);
    return this.db.one(`UPDATE users SET popularity = ${score} WHERE id = ${id} RETURNING *`);
  },
  add(user) {
    const query = pgp.helpers.insert(user, null, 'users');
    return this.db.one(`${query} RETURNING *`);
  },
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id = ${id}`);
  },
  update(data, id) {
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },
  getByLogin(login) {
    return this.db.one('SELECT * FROM users WHERE login = $1', login);
  },
  EmailVerif(email) {
    return this.db.one('SELECT * FROM users WHERE email = $1', email);
  },
  getAll() {
    return this.db.any('SELECT * FROM users');
  },
  addImg(imgs, imgProfile, id) {
    if (!imgProfile && !imgs.photo_1) return Promise.reject('no files');
    if (!imgProfile) return this.db.one(`${pgp.helpers.update(imgs, null, 'users')} WHERE id=${id} RETURNING *`);
    const data = { ...imgs, photo_5: imgProfile };
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },
  delete(id) {
    return this.db.one('DELETE FROM users WHERE id=$1 RETURNING *', id);
  },
};

export default User;
