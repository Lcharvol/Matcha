import pgpConnector from 'pg-promise';
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
      if (_.includes(Object.keys(scoreTable), key) && (!_.isEmpty(item) || item === true)) return (acc + scoreTable[key]);
      return acc;
    }, 0);
    return this.db.one(`UPDATE users SET popularity = ${score} WHERE id = ${id} RETURNING *`);
  },
  add(user) {
    const query = pgp.helpers.insert(user, null, 'users');
    return this.db.one(`${query} RETURNING *`);
  },
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id = ${id}`);
  },
  getConnectedUser() {
    return this.db.one('SELECT count(*) FROM users WHERE connected = true');
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
  getAll(filterString, sortBy) {
    return this.db.any(`SELECT * FROM users ${filterString} AND confirmed = true ${sortBy}`);
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
  addSocket(newSocket, id) {
    console.log('ADDsOCKET', newSocket);
    return this.db.any(`UPDATE users SET socket_id = array_cat(socket_id, '{${newSocket}}') WHERE id =${id}`);
  },
  deleteSocket(deleteSocket, id) {
    return this.db.any(`UPDATE users SET socket_id = array_remove(socket_id, '${deleteSocket}') WHERE id =${id}`);
  },
};
export default User;
