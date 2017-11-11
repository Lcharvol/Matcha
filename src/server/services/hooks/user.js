import jwt from 'jsonwebtoken';
// import { schemaRegister, schemaLogin } from '../../../lib/validator';
import mailer from '../../http/mailer';
import User from '../../models/User'; // eslint-disable-line

export const validateRegisterForm = (ctx) => {
  const { input } = ctx;
  const user = input;
  // if (Joi.validate(user, schemaRegister).error) {
  //   const { config: { httpCode: { BadRequest } } } = ctx.globals;
  //   return Promise.reject({ status: BadRequest });
  // }
  return Promise.resolve({ ...ctx, input: user });
};

export const sendConfirmEmail = (ctx) => {
  const {
    input: { email },
    globals: {
      config:
        {
          secretSentence, expiresIn, server, routes: { confirmEmail },
        },
    },
    output: { id },
  } = ctx;
  const getUrl = `http://${server.host}:${server.port}`;
  const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
  mailer(
    email,
    'Confirmation Email - Matcha',
    `Hello, please click here to confirm your email:  ${getUrl}${confirmEmail}?matchaToken=${token}`,
  );
  return Promise.resolve(ctx);
};
