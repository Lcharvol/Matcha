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
    // if (data.id) { return (Promise.reject({ msg: 'id can\'t be change' })); }
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
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
};

export default User;
