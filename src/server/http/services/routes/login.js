import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-as-promised';

const login = async (req, res) => {
  try {
    const { password: inputPassword } = req.body;
    const { ctx: { config: { secretSentence, expiresIn } }, user } = req;
    console.log(inputPassword, user.password);
    await bcrypt.compare(inputPassword, user.password);
    const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
    res.json({ matchaToken: token });
  } catch (err) {
    const message = err.message === 'invalid' ? 'wrong password': 'failed to auth';
    req.Err(message);
  }
};
export default login;
