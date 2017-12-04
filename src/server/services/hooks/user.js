import jwt from 'jsonwebtoken';
import geoip from 'geoip-lite';
import _ from 'lodash';
import axios from 'axios';

import mailer from '../../../lib/mailer';
import validate, { loginForm, registerForm, editProfilForm } from '../../../lib/validators';
import User from '../../models/User'; // eslint-disable-line

export const getInfoToUpdate = async (req, res, next) => {
  const inputUpdate = req.body;
  const {
    config: {
      optionGeocoder: {
        apiKey,
      },
    },
  } = req.ctx;
  try {
    const err = validate(inputUpdate);
    const infoCleaned = _.pick(inputUpdate, editProfilForm);
    if (_.isEmpty(infoCleaned)) {
      return req.Err('no one valid champ');
    }
    req.infoToUpdate = infoCleaned;
    const contains = _.intersection(Object.keys(inputUpdate), ['blocked']);
    if (req.infoToUpdate.blocked == req.user.id) return req.Err('can\'t blocked yourself dude'); // keep the ==
    if (contains.length > 0) {
      contains.forEach(index => {
        const inDb = req.user[index];
        inDb.push(req.infoToUpdate[index]);
        req.infoToUpdate[index] = `{${inDb.toString()}}`;
      });
    }
    if (req.infoToUpdate.interest)
      req.infoToUpdate.interest = `{${req.infoToUpdate.interest.toString()}}`;
    if (req.infoToUpdate.postal_code) {
      const { data: { results } } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=04200+FR&key=${apiKey}`);
      const { location: { lat: latitude, lng: longitude } } = results[0].geometry;
      if (latitude && longitude)
        req.infoToUpdate = Object.assign(req.infoToUpdate, { latitude, longitude });
    }
    console.log(req.infoToUpdate);
    next();
  } catch (err) {
    req.Err(_.isEmpty(err.message) ? 'wrong data provided' : err.message);
  }
};

export const validateRegisterForm = async (req, res, next) => {
  try {
    const user = req.body;
    const err = validate(user);
    if (err) throw err;
    req.registerInputName = registerForm;
    next();
  } catch (err) {
    req.Err(`${err}`);
  }
};

export const validateLoginForm = async (req, res, next) => {
  try {
    const user = req.body;
    const err = validate(user);
    if (err) throw err;
    req.registerInputName = loginForm;
    next();
  } catch (err) {
    req.Err(err);
  }
};

export const checkIfConfirmedAndReturnUser = async (req, res, next) => {
  const { login } = req.body;
  const { db } = req.ctx;
  try {
    const user = await User.getByLogin.bind({ db })(login);
    if (!user.confirmed) return req.Err('Not Confirmed!');
    req.user = user;
    next();
  } catch (err) {
    req.Err('No account found!');
  }
};

export const sendConfirmEmail = async (user, ctx) => {
  const { id, email } = user;
  const {
    config: {
      secretSentence, expiresIn, server, routes: { confirmEmail },
    },
  } = ctx;
  const getUrl = `http://${server.host}:${server.port}`;
  const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
  mailer(
    email,
    'Confirmation Email - Matcha',
    `Hello, please click here to confirm your email:  ${getUrl}${confirmEmail}?matchaToken=${token}`,
  );
};

export const checkIfNotBlocked = async (req, res) => {
  try {
    const currentUser = req.user;
    const _users = req.users || [req.userRequested];
    const users = _.filter(_users, (user) => !_.includes(user.blocked, currentUser.id.toString()) && !_.includes(req.user.blocked, user.id.toString()));
    if (_.isEmpty(users)) return req.Err('blocked');
    if (req.userRequested) return res.json({ details: users[0] });
    res.json({ details: users });
  } catch (err) {
    console.log(err);
    req.Err(err || 'failed to get user');
  }
};

export const getIp = (req, res, next) => {
  req.user = {};
  const { connection: { remoteAddress } } = req;
  let ip = remoteAddress;
  if (ip === '127.0.0.1' || ip === '::1' || !ip) ip = '62.210.34.191';
  req.user.ip = ip;
  next();
};

export const getLocalisation = async (req, res, next) => {
  const { ip } = req.user;
  const {
    config: {
      optionGeocoder: {
        apiKey,
      },
    },
  } = req.ctx;
  try {
    const { data: { location } } = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`);
    const range = { latitude: location.lat.toFixed(6), longitude: location.lng.toFixed(6) };
    const userWithRange = Object.assign(req.user, range);
    req.user = userWithRange;
    const { data: { results } } = await axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${range.latitude},${range.longitude}`);
    const { long_name: postal_code } = results[0].address_components[6];
    const { long_name: city } = results[0].address_components[3];
    req.user = Object.assign(req.user, { postal_code, city });
    next();
  } catch (err) {
    const geo = geoip.lookup(ip);
    const range = { latitude: geo.ll[0], longitude: geo.ll[1] };
    const userWithRange = Object.assign(req.user, range);
    req.user = Object.assign(userWithRange, { postal_code: '75017', city: 'Paris' });
    next();
  }
};
