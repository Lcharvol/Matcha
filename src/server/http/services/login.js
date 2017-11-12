
// login({ user, password }) {
//     const { models: { users } } = this.globals;
//     return bcrypt.compare(password, user.password).then(() => {
//       const { globals: { config: { secretSentence }, expiresIn } } = this;
//       const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
//       const { socket } = this.locals;
//       users.emit('login', { user, socket });
//       return { matchaToken: token };
//     });

// export default login;
