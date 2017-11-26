import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import loginErrors from './loginErrors';
import registerErrors from './registerErrors';

const reducer = combineReducers({
    user,
    users,
    loginErrors,
    registerErrors,
});

export default reducer;