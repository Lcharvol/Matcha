const { is, mergeWith } = require('ramda');
const deepMerge = (a, b) => (is(Object, a) && is(Object, b)) ? mergeWith(deepMerge, a, b) : b;
module.exports.deepMerge = deepMerge;
