import debug from 'debug';
import multer from 'multer';
import path from 'path';

export const getUrl = server => `http://${server.address().address}:${server.address().port}`;

export const bindCtx = (ctx) => (req, res, next) => {
  req.ctx = ctx;
  next();
};

export const bindError = (req, res, next) => {
  req.Err = (msg, er) => {
    const { stack } = new Error();
    try {
      const regex = /\(.*[Mm]atcha\/src\/server\/(.*):(\d*):(\d*)\)/igm;
      const matches = regex.exec(stack.split('\n')[2]);
      const [, file, line] = matches;
      const log = debug(`matcha:${file}:${line}`);
      log(`DETAILS: ${msg} ${er}`);
      res.status(201);
      res.json({ details: msg });
    } catch (err) {
      console.log(`DETAILS: $${err}`);
      res.status(201);
      res.json({ details: msg });
    }
  };
  next();
};

export const bindLogger = (req, res, next) => {
  req.log = (msg) => {
    const { stack } = new Error();
    const regex = /\(.*[Mm]atcha\/src\/server\/(.*):(\d*):(\d*)\)/igm;
    const matches = regex.exec(stack.split('\n')[2]);
    const [, file, line] = matches;
    const log = debug(`matcha:${file}:${line}`);
    log(msg);
  };
  next();
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../public/uploads/'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}${Math.random().toString()}.jpg`);
  },
});

const upload = multer({
  storage,
  dest: path.join(__dirname, '../../../public/uploads/'),
  limits: {
    fileSize: 2000000,
    files: 1,
  },
}).fields([
  { name: 'pic1', maxCount: 1 },
  { name: 'pic2', maxCount: 1 },
  { name: 'pic3', maxCount: 1 },
  { name: 'pic4', maxCount: 1 },
  { name: 'profile_picture', maxCount: 1 },
]);

export const uploadImage = (req, res, next) => upload(req, res, next, (err) => err ? req.Err({ details: 'Max count reach', err }) : next());
