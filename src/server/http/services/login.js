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
    res.status = 201;
    if (err.message === 'invalid') return res.json({ details: 'wrong password' });
    res.json({ details: 'failed to auth' });
  }
};
export default login;
