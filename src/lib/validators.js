import yup from 'yup';
import _ from 'lodash';
import { fields as fieldsRegister } from '../client/forms/register';
import { fields as fieldsLogin } from '../client/forms/login';

export const schemaRegister = yup.object(_.reduce(fieldsRegister, (acc, item, key) => ({
  ...acc,
  [key]: item.validate,
}), {}));

export const schemaLogin = yup.object(_.reduce(fieldsLogin, (acc, item, key) => ({
  ...acc,
  [key]: item.validate,
}), {}));

