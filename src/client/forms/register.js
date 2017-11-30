import { InputField } from '../fields';
import { SelectField }from '../fields/SelectField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
export const fields = {
  login: {
    label: 'Login',
    component: InputField,
    required: true,
  },
  email: {
    label: 'Email',
    component: InputField,
    required: true,
  },
  firstname: {
    label: 'First Name',
    component: InputField,
    required: true,
  },
  lastname: {
    label: 'Last Name',
    component: InputField,
    required: true,
  },
  password: {
    label: 'Password',
    component: InputField,
    required: true,
  },
  age: {
    label: 'Age',
    component: InputField,
    required: true,
  },
  sexe: {
    label: 'Je suis',
    component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
