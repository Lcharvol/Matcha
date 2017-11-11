import Yup from 'yup';
import { InputField, TextAreaField  } from '../fields';
import {
  SelectField,
} from '../fields/SelectField';
import { MarkDownField } from '../fields/MarkDownField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';

const fields = {
  sexe: {
    label: 'Je suis',
    component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    validate: Yup.string(),
    required: true,
  },
  lookingFor: {
    label: 'Je recherche',
    component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    validate: Yup.string(),
    required: true,
  },
  bio: {
    label: 'Ma bio',
    component: MarkDownField,
    validate: Yup.string(),
    required: true,
  },
  interest: {
    label: 'Interêts',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  pictures: {
    label: 'Mes photos',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));
