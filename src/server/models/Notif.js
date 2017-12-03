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
  seen(id) {
    return this.db.any('UPDATE notifs SET push = true WHERE user_receive = $1', id);
  },
};

export default Notif;
