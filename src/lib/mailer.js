import nodemailer from 'nodemailer';
import { secretPasswordMail } from '../../config/server';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apimatcha42@gmail.com',
    pass: secretPasswordMail,
  },
});

const mailer = (who, sub, message) => {
  const info = {
    to: who,
    subject: sub,
    text: message,
  };
  transport.sendMail(info);
  transport.close();
};

export default mailer;
