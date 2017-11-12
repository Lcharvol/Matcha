import bcrypt from 'bcrypt-as-promised';
import User from '../../models/User';
import { schemaLogin } from '../../../lib/validators';

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { db } = req.ctx;
    await schemaLogin.fields.password.validate(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update.bind({ db })({ password: hashedPassword }, req.tokenId);
    res.status = 200;
    res.json({ details: 'password has been updated!' });
  } catch (err) {
    res.status = 201;
    res.json({ details: 'wrong format' });
  }
};

export default resetPassword;
