import { LOAD_USERS } from '../actions/users';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS: {
      return action.users;
    }
    default:
        return state;
  }
};

export default reducer;