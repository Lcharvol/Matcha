import { InputField } from '../fields';
import { SelectField }from '../fields/SelectField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';

export const fields = {
  login: {
    label: 'login',
    component: InputField,
    validate: false,
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
