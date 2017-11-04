import { combineReducers } from 'redux';
import user from './user';
import users from './users';

const reducer = combineReducers({
    user,
    users,
});

export default reducer;