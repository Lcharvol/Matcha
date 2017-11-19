import {
  LOAD_USERS,
  SORT_USERS,
  FILTER_USERS
} from '../actions/users';

const initialState = {
  details: [],
  sort: { by: 'name', order: 'asc' },
  filter: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_USERS: {
      const { by, order } = state.sort;
      const newOrder = by === action.sortBy && order === 'asc' ? 'desc' : 'asc';
      return { ...state, sort: { by: action.sortBy, order: newOrder } };
    }
    case FILTER_USERS:
      return { ...state, filter: action.filter };
    case LOAD_USERS: {
      return {...state, details: action.users.details};
    }
    default:
        return state;
  }
};

export default reducer;