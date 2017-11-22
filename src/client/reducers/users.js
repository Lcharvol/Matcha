import {
  LOAD_USERS,
  loadUsers,
  SORT_USERS,
  FILTER_USERS
} from '../actions/users';
import { reqGetAll } from '../request';

const initialState = {
  details: [],
  sort: { by: 'location', order: 'ASC' },
  filter: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_USERS: {
      const { by, order } = state.sort;
      const newOrder = by === action.sortBy && order === 'asc' ? 'desc' : 'asc';
      const query = {
        sort: `${by},${newOrder}`,
      }
      reqGetAll((users) => action.asyncDispatch(loadUsers(users)), query);
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
