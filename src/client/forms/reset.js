import { InputField } from '../fields';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
export const fields = {
  password: {
    label: 'Password',
    component: InputField,
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
