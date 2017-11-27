import pgpConnector from 'pg-promise';
import _ from 'lodash';

const pgp = pgpConnector({ capSQL: true });

const User = {
  delete(userSendLike, userReceiveLike) {
    return this.db.any(`DELETE FROM likes WHERE user_send_like = ${Number(userSendLike)} AND user_receive_like =  ${Number(userReceiveLike)} RETURNING *`);
  },
  add(userSendLike, userReceiveLike) {
    const data = { user_receive_like: userReceiveLike, user_send_like: userSendLike, date: new Date() };
    const query = pgp.helpers.insert(data, null, 'likes');
    return this.db.one(`${query} RETURNING *`);
  },
  getLike(userSendLike, userReceiveLike) {
    return this.db.one(`SELECT count(*) FROM likes WHERE user_send_like = ${Number(userSendLike)} AND user_receive_like =  ${Number(userReceiveLike)}`);
  },
};

export default User;
