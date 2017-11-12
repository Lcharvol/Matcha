import { filter, compose, reduce, toPairs, map } from 'ramda';

const getDomainIds = domainValues => map(x => x.id, domainValues || []);
const extendWithRequired = ({ label, required }) => rule =>
  required ? rule.required(`'${label}' is required!`) : rule;
const extendWithDomainValues = ({ domainValues }) => rule =>
  domainValues ? rule.oneOf(getDomainIds(domainValues)) : rule;
const extendWithValidateRule = test => rule => (test ? rule.test(test) : rule);
const makeValidationRule = (name, field, extend = {}) => {
  const { validate } = field;
  if (!validate) return;
  return reduce((acc, fn) => fn(acc), validate, [
    extendWithRequired(field),
    extendWithDomainValues(field),
    extendWithValidateRule(extend[name]),
  ]);
};

export const getOneValidationSchema = (fields, extend) =>
  compose(
    reduce((acc, [name, field]) => ({ ...acc, [name]: field.validate }), {}),
    filter(([name, field]) => field.validate), // eslint-disable-line no-unused-vars
    map(([name, field]) => [
      name,
      { ...field, validate: makeValidationRule(name, field, extend) },
    ]),
    toPairs,
  )(fields);

export const getOneField = fields => name => ({ name, ...fields[name] });
export const getDefaultValues = compose(
  reduce((acc, [name, field]) => ({ ...acc, [name]: field.defaultValue }), {}),
  toPairs,
);
