import _ from 'lodash';

export const checkIfNotBlocked = async (req, res) => {
  try {
    const currentUser = req.user;
    const _users = req.users || [req.userRequested];
    const users = _.filter(_users, (user) => !_.includes(user.blocked, currentUser.id));
    if (_.isEmpty(users)) return req.Err('no data returned');
    if (req.userRequested) return res.json({ details: users[0] });
    res.json({ details: users });
  } catch (err) {
    req.Err(err || 'failed to get user');
  }
};
