import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import loginErrors from './loginErrors';

const reducer = combineReducers({
    user,
    users,
    loginErrors,
});

export default reducer;