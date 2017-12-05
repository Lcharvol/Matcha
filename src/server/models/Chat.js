import pgpConnector from 'pg-promise';
import _ from 'lodash';

const pgp = pgpConnector({ capSQL: true });

const Notif = {
  add(userSend, userReceive, msg) {
    const data = {
      user_receive: userReceive,
      user_send: userSend,
      date: new Date(),
      msg,
    };
    const query = pgp.helpers.insert(data, null, 'chat');
    return this.db.one(`${query} RETURNING *`);
  },
  getAllConversation(userSend, userReceive) {
    // i have to order by date
    return this.db.any(`SELECT * FROM chat WHERE (user_send = ${Number(userSend)} AND user_receive = ${Number(userReceive)}) OR (user_send = ${Number(userReceive)} AND user_receive = ${Number(userSend)}) ORDER BY date DESC`);
  },
};

export default Notif;
