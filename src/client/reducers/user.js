import { CONNECTUSER } from '../actions/connectUser';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CONNECTUSER:
      return {
        login: action.login,
      };
    default:
        return state;
  }
};

export default reducer;