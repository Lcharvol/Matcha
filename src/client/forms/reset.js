import Yup from 'yup';
import { InputField } from '../fields';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
export const fields = {
  password: {
    label: 'Password',
    component: InputField,
    validate: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/,  { message: 'not secure', excludeEmptyString: true }).required(),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));
