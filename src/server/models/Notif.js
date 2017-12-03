import pgpConnector from 'pg-promise';
import _ from 'lodash';

const pgp = pgpConnector({ capSQL: true });

const Notif = {
  add(userSend, userReceive, details, type) {
    const data = {
      user_receive: userReceive,
      user_send: userSend,
      date: new Date(),
      details,
      type,
    };
    const query = pgp.helpers.insert(data, null, 'notifs');
    return this.db.one(`${query} RETURNING *`);
  },
  get(id) {
    return this.db.any('SELECT * FROM notifs WHERE user_receive = $1', id);
  },
  getSome(userSend, userReceive, type) {
    console.log(`SELECT count(*) FROM notifs WHERE user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)} AND type = '${type}'`);
    return this.db.one(`SELECT count(*) FROM notifs WHERE user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)} AND type = $1`, type).catch(err => console.log(err));
  },
  deleteLike(userSend, userReceive) {
    return this.db.any(`DELETE FROM likes WHERE user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)} AND type = 'like' RETURNING *`);
  },
  seen(id) {
    return this.db.any('UPDATE notifs SET push = true WHERE user_receive = $1', id);
  },
};

export default Notif;
