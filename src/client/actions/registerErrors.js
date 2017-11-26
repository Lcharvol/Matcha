export const REGISTER_ERRORS = 'REGISTER_ERRORS';
export const RESET_REGISTER_ERRORS = 'RESET_REGISTER_ERRORS';

export const errorRegister = (details) => {
  return { type: REGISTER_ERRORS, details};
};

export const resetLoginErrors = () => {
  return { type: RESET_REGISTER_ERRORS};
};
