import Yup from 'yup';
import { InputField } from '../fields';
import { SelectField }from '../fields/SelectField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';
export const fields = {
  email: {
    label: 'Email',
    component: InputField,
    validate: false,
    // validate: Yup.string().email().required(),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend => {
  console.log(extend);
  return Yup.object().shape(getOneValidationSchema(fields, extend));
}
