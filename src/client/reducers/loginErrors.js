import { LOGIN_ERRORS, RESET_LOGIN_ERRORS } from '../actions/loginErrors';

const reducer = (state = '', action) => {
    switch (action.type) {
        case LOGIN_ERRORS: {
            return action.details;
        }
        case RESET_LOGIN_ERRORS: {
            return '';
        }
        default:
          return state;
    }
  };

  export default reducer;
