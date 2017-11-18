import { NO_ACCOUNT_FOUND, RESET_LOGIN_ERRORS } from '../actions/loginErrors';

const reducer = (state = '', action) => {
    switch (action.type) {
        case NO_ACCOUNT_FOUND: {
            return 'Wrong login or password';
        }
        case RESET_LOGIN_ERRORS: {
            return '';
        }
        default:
          return state;
    }
  };
  
  export default reducer;
  