export const NO_ACCOUNT_FOUND = 'NO_ACCOUNT_FOUND';
export const RESET_LOGIN_ERRORS = 'RESET_LOGIN_ERRORS';

export const noAccountFound = () => {
  return { type: NO_ACCOUNT_FOUND};
};

export const resetLoginErrors = () => {
  return { type: RESET_LOGIN_ERRORS};
};