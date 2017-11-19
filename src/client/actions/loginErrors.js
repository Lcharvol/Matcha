export const LOGIN_ERRORS = 'LOGIN_ERRORS';
export const RESET_LOGIN_ERRORS = 'RESET_LOGIN_ERRORS';

export const errorLogin = (details) => {
  return { type: LOGIN_ERRORS, details};
};

export const resetLoginErrors = () => {
  return { type: RESET_LOGIN_ERRORS};
};
