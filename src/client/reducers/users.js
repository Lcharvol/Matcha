import {
  LOAD_USERS,
  loadUsers,
  SORT_USERS,
  FILTER_USERS,
  CONNECTED_USER,
  DISCONNECT_USER,
  SEARCH_USERS,
} from '../actions/users';
import { reqGetAll, reqUpdateUser } from '../request';

const initialState = {
  details: [],
  sort: { by: 'location', order: 'ASC' },
  search: { by: '', value: '' },
  filter: '',
  connectedUsers: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS: {
      const { by, order } = state.sort;
      const newOrder = by === action.searchBy && order === 'asc' ? 'desc' : 'asc';
      const query = {
        search: `${by},${newOrder}`,
      }
      return { ...state, search: { by: action.searchBy, order: newOrder } };
    }
    case SORT_USERS: {
      const { by, order } = state.sort;
      const newOrder = by === action.sortBy && order === 'asc' ? 'desc' : 'asc';
      const query = {
        sort: `${by},${newOrder}`,
      }
      console.log(state.sort);
      console.log(query);
      reqGetAll((users) => action.asyncDispatch(loadUsers(users)), query);
      console.log(action.sortBy, newOrder);
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
