import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import { validateRegisterForm, sendConfirmEmail } from './hooks/user.js';
// import { loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers } from './hooks/suggestion';

const service = {
  name: 'user',

  post(user) {
    const { models: { users } } = this.globals;
    return bcrypt.hash(user.password, 10)
      .then(hashedPassword => users.add(R.assoc('password', hashedPassword, user)));
  },

};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    post: [validateRegisterForm],
  })
  .after({
    post: [sendConfirmEmail],
  });

export default init;
