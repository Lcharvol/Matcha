import User from '../../../models/User';

const confirmEmail = async (req, res) => {
  try {
    const {
      db,
      config: { urlClient },
    } = req.ctx;
    const { id } = req.user;
    const user = await User.update.bind({ db })({ confirmed: true }, Number(id));
    res.redirect(`${urlClient}?login=${user.login}`);
  } catch (err) {
    req.Err(err.message);
  }
};

export default confirmEmail;
