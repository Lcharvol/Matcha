import { NO_ACCOUNT_FOUND, RESET_LOGIN_ERRORS } from '../actions/loginErrors';

const reducer = (state = '', action) => {
    switch (action.type) {
        case NO_ACCOUNT_FOUND: {
            return 'Wrong login or password';
        }
        case NO_ACCOUNT_FOUND: {
            return '';
        }
        default:
          return state;
    }
  };
  
  export default reducer;
  