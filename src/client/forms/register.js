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
  email: {
    label: 'Email',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  firstName: {
    label: 'First Name',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  lastName: {
    label: 'Last Name',
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
  repeatPassword: {
    label: 'Repeat password',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));