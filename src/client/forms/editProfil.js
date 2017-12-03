import { InputField, TextAreaField } from '../fields';
import { SelectField, TagsSelectField } from '../fields/SelectField';
import { MarkDownField } from '../fields/MarkDownField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';

export const fields = {
  sexe: {
    label: 'i am',
    component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    required: true,
  },
  sexualorientation: {
    label: 'Sexual orientation',
    component: SelectField,
    domainValues: [
      { id: 'bisexual', value: 'Un Bisexuel' },
      { id: 'homosexual', value: 'Une Homosexuel' },
      { id: 'heterosexual', value: 'Un Hétérosexuel' },
    ],
    required: true,
  },
  bio: {
    label: 'Ma bio',
    component: MarkDownField,
    required: true,
  },
  zipcode: {
    label: 'ZipCode',
    component: InputField,
    required: true,
  },
  interest: {
    label: 'Interêts',
    component: TagsSelectField,
    required: false,
  },
  pictures: {
    label: 'Pictures',
    component: InputField,
  },
  profilPicture: {
    label: 'Profil picture',
    component: InputField,
  },
  login: {
    label: 'Login',
    component: InputField,
    required: true,
  },
  email: {
    label: 'Email',
    component: InputField,
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
  age: {
    label: 'Age',
    component: InputField,
    required: true,
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
