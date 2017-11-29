import Yup from 'yup';
import { InputField, TextAreaField } from '../fields';
import { SelectField, TagsSelectField } from '../fields/SelectField';
import { MarkDownField } from '../fields/MarkDownField';
import { getDefaultValues, getOneValidationSchema, getOneField } from './utils';

export const fields = {
  sexe: {
    label: 'Je suis',
    component: SelectField,
    domainValues: [
      { id: 'man', value: 'Un homme' },
      { id: 'woman', value: 'Une femme' },
    ],
    validate: Yup.string().matches(/^man|woman$/, { message: 'man or woman', excludeEmptyString: true }),
    required: true,
  },
  sexualOrientation: {
    label: 'Mon orientation sexuelle',
    component: SelectField,
    domainValues: [
      { id: 'bisexual', value: 'Un Bisexuel' },
      { id: 'homosexual', value: 'Une Homosexuel' },
      { id: 'heterosexual', value: 'Un Hétérosexuel' },
    ],
    validate: Yup.string().matches(/^bisexual|homosexual|heterosexual$/, { message: 'not a good orientation', excludeEmptyString: true }),
    required: true,
  },
  bio: {
    label: 'Ma bio',
    component: MarkDownField,
    validate: Yup.string().max(500),
    required: true,
  },
  interest: {
    label: 'Interêts',
    component: TagsSelectField,
    validate: Yup.string(),
    required: true,
  },
  pictures: {
    label: 'Mes photos',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  profilPicture: {
    label: 'Ma photo de profil',
    component: InputField,
    validate: Yup.string(),
    required: true,
  },
  login: {
    label: 'Login',
    component: InputField,
    validate: Yup.string().min(3).max(30),
    required: true,
  },
  email: {
    label: 'Email',
    component: InputField,
    validate: Yup.string().email(),
    required: true,
  },
  firstname: {
    label: 'First Name',
    component: InputField,
    validate: Yup.string().matches(/^[A-Za-z ]{2,30}$/, { message: 'not a good login', excludeEmptyString: true }),
    required: true,
  },
  lastname: {
    label: 'Last Name',
    component: InputField,
    validate: Yup.string().matches(/^[A-Za-z ]{2,30}$/, { message: 'not a good login', excludeEmptyString: true }),
    required: true,
  },
  password: {
    label: 'Password',
    component: InputField,
    validate: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/, { message: 'not secure', excludeEmptyString: true }),
    required: true,
  },
  age: {
    label: 'Age',
    component: InputField,
    validate: Yup.number().integer().min(18).max(99),
    required: true,
  },
  blocked: {
    label: 'Blocked',
    component: InputField,
    validate: Yup.number(),
    required: true,
  },
  connected: {
    label: 'connected',
    component: InputField,
    validate: Yup.boolean(),
  },
};

export const defaultValues = getDefaultValues(fields);
export const getField = getOneField(fields);
export const getValidationSchema = extend =>
  Yup.object().shape(getOneValidationSchema(fields, extend));
