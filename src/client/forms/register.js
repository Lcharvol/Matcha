import Yup from 'yup';
import { InputField } from '../fields';
// import { SelectField } from '../fields/SelectField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
export const fields = {
  login: {
    label: 'Login',
    component: InputField,
    validate: Yup.string().min(3).max(30).required(),
    required: true,
  },
  email: {
    label: 'Email',
    component: InputField,
    validate: Yup.string().email().required(),
    required: true,
  },
  firstname: {
    label: 'First Name',
    component: InputField,
    validate: Yup.string().matches(/^[A-Za-z ]{2,30}$/).required(),
    required: true,
  },
  lastname: {
    label: 'Last Name',
    component: InputField,
    validate: Yup.string().matches(/^[A-Za-z ]{2,30}$/).required(),
    required: true,
  },
  password: {
    label: 'Password',
    component: InputField,
    validate: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
    required: true,
  },
  age: {
    label: 'Age',
    component: InputField,
    validate: Yup.number().integer().min(18).max(99).required(),
    required: true,
  },
  sexe: {
    label: 'Je suis',
    // component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    validate: Yup.string().matches(/^man|woman$/),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));
