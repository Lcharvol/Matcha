import _ from 'lodash';

const cleanUser = (user) => {
  const cleanUser = _.omit(user, ['socket_id', 'password', 'confirmed', 'pic1', 'pic2', 'pic3', 'pic4']);
  const newUser = _.merge(cleanUser, {
    pictures: _.reduce(_.pick(user, ['pic1', 'pic2', 'pic3', 'pic4']), (res, val) => {
      res.push(val);
      return res;
    }, []),
  });
  return newUser;
};

export {
  cleanUser,
};
