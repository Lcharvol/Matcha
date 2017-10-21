import Yup from 'yup';
import { InputField } from '../fields';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
const fields = {
  login: {
    label: 'Login',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  password: {
    label: 'Password',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));