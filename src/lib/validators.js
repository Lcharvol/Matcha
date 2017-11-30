import _ from 'lodash';

const validate = (values, props) => {
  let errors = {};
  const keys = Object.keys(values);
  if (_.includes(keys, 'login') && !values.login) {
    errors.login = 'login Required';
  } else if (!/^\w{3,30}$/.test(values.login)) {
    errors.login = 'Invalid login';
  }
  if (_.includes(keys, 'email') && !values.email) {
    errors.email = 'email Required';
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (_.includes(keys, 'lastname') && !values.lastname) {
    errors.lastname = 'lastname Required';
  } else if (values.lastname &&!/^[A-Za-z ]{2,30}$/.test(values.lastname)) {
    errors.lastname = 'Invalid lastname';
  }
  if (_.includes(keys, 'firstname') && !values.firstname) {
    errors.firstname = 'firstname Required';
  } else if (values.firstname && !/^[A-Za-z ]{2,30}$/.test(values.firstname)) {
    errors.firstname = 'Invalid firstname';
  }
  if (_.includes(keys, 'password') && !values.password) {
    errors.password = 'password Required';
  } else if (values.password && !/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/.test(values.password)) {
    errors.password = 'Invalid password';
  }
  if (_.includes(keys, 'sexe') && !values.sexe) {
    errors.sexe = 'sexe Required';
  } else if (values.sexe && !/^man|woman$/i.test(values.sexe)) {
    errors.sexe = 'Invalid sexe';
  }
  if (_.includes(keys, 'sexualorientation') && !values.sexualorientation) {
    errors.sexualorientation = 'sexualorientation Required';
  } else if (values.sexualorientation && !/^bisexual|homosexual|heterosexual$/i.test(values.sexualorientation)) {
    errors.sexualorientation = 'Invalid sexualorientation';
  }
  if (_.includes(keys, 'age') && !values.age) {
    errors.age = 'age Required';
  } else if (values.age && !/^[2-9][0-9]|[1][8-9]$/i.test(values.age)) {
    errors.age = 'Invalid age';
  }
  if (_.includes(keys, 'bio') && !values.bio) {
    errors.bio = 'bio Required';
  } else if (values.bio && !/\w*{5,100}$/i.test(values.bio)) {
    errors.bio = 'Invalid bio';
  }
  if (_.includes(keys, 'interest') && !values.interest) {
    errors.interest = 'interest Required';
  } else if (values.interest && !/\w*{,20}$/i.test(values.interest)) {
    errors.interest = 'Invalid interest';
  }
  if (_.includes(keys, 'blocked') && !values.blocked) {
    errors.blocked = 'Required';
  } else if (values.blocked && !/\d$/i.test(values.blocked)) {
    errors.blocked = 'Invalid blocked';
  }
  if (_.isEmpty(errors)) return false;
  return errors;
};

export const loginForm = ['login', 'password'];
export const registerForm = ['email', 'login', 'firstname', 'lastname', 'password', 'age', 'sexe'];
export const editProfilForm = ['bio', 'email', 'login', 'firstname', 'lastname', 'sexualorientation', 'blocked', 'interest', 'age', 'sexe'];
export default validate;
