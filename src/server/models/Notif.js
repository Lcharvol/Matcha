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
    return this.db.any('SELECT * FROM notifs WHERE user_receive = $1 ORDER BY date DESC', id);
  },
  getUnseenNotifs(id) {
    return this.db.one('SELECT count(*) FROM notifs WHERE user_receive = $1 AND push = false', id).then(res => Number(res.count));
  },
  ifMutualLike(userSend, userReceive) {
    return this.db.one(`SELECT count(*) FROM notifs WHERE (user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)} AND type = 'like') OR (user_send = ${Number(userReceive)} AND user_receive =  ${Number(userSend)} AND type = 'like')`).then(res => Number(res.count) === 2);
  },
  getSome(userSend, userReceive, type) {
    return this.db.one(`SELECT count(*) FROM notifs WHERE "user_send" = ${Number(userSend)} AND "user_receive" = ${Number(userReceive)} AND type = $1`, type).then(res => Number(res.count) > 0);
  },
  deleteLike(userSend, userReceive) {
    return this.db.any(`DELETE FROM notifs WHERE "user_send" = ${Number(userSend)} AND "user_receive" = ${Number(userReceive)} AND type = 'like' RETURNING *`);
  },
  deleteAllNotif(userSend, userReceive) {
    return this.db.any(`DELETE FROM notifs WHERE (user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)}) OR (user_send = ${Number(userReceive)} AND user_receive = ${Number(userSend)}) RETURNING *`);
  },
  seen(id) {
    return this.db.any('UPDATE notifs SET push = true WHERE user_receive = $1', id);
  },
};

export default Notif;
