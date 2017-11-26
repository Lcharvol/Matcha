import { REGISTER_ERRORS, RESET_REGISTER_ERRORS } from '../actions/registerErrors';

const reducer = (state = '', action) => {
    switch (action.type) {
        case REGISTER_ERRORS: {
            console.log('Register Erro Reducer');
            return action.details;
        }
        case RESET_REGISTER_ERRORS: {
            return '';
        }
        default:
          return state;
    }
  };

  export default reducer;
