import pgpConnector from 'pg-promise';

const pgp = pgpConnector({ capSQL: true });

const User = {
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
  addImg(imgs, imgProfile, id) {
    if (!imgProfile && !imgs.photo_1) return Promise.reject({ status: 'no files' });
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
