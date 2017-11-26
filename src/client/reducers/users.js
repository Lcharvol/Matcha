import {
  LOAD_USERS,
  loadUsers,
  SORT_USERS,
  FILTER_USERS,
  CONNECTED_USER,
  DISCONNECT_USER,
  SEARCH_USERS,
  UPDATE_SEARCH_USERS_TYPE,
  UPDATE_SEARCH_USERS_VALUE,
} from '../actions/users';
import { reqGetAll, reqUpdateUser } from '../request';

const initialState = {
  details: [],
  sort: { by: 'location', order: 'ASC' },
  search: { by: 'age', value: '' },
  filter: '',
  connectedUsers: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS: {
      return state;
    }
    case UPDATE_SEARCH_USERS_TYPE: {
      return {...state, search: { ...state.search, by: action.searchBy }};
    }
    case UPDATE_SEARCH_USERS_VALUE: {
      return {...state, search: { ...state.search, value: action.value }};
    }
    case SORT_USERS: {
      const { by, order } = state.sort;
      const newOrder = by === action.sortBy && order === 'asc' ? 'desc' : 'asc';
      const query = {
        sort: `${action.sortBy},${newOrder}`,
      }
      reqGetAll((users) => action.asyncDispatch(loadUsers(users)), query);
      return { ...state, sort: { by: action.sortBy, order: newOrder } };
    }
    case FILTER_USERS:
      return { ...state, filter: action.filter };
    case LOAD_USERS: {
      return {...state, details: action.users.details};
    }
    case CONNECTED_USER: {
      return {...state, connectedUsers: Number(action.usersConnected)};
    }
    case DISCONNECT_USER: {
      reqUpdateUser({ connected: false });
      localStorage.removeItem('matchaToken');
    }
    default:
        return state;
  }
};

export default reducer;
