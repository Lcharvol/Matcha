const R = require('ramda');
const defaultConfig = require('./default');
const { deepMerge } = require('./utils');
const supportedModes = {
  development: require('./development'),
  production: require('./production'),
  testing: require('./testing'),
};
const config = supportedModes[process.env.NODE_ENV] || {};
const { secret: { path } = {} } = config;
const sConfig = path ? require(path) : {};
module.exports = deepMerge(R.merge(defaultConfig, config), sConfig);
