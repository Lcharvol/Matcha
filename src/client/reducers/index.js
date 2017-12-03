import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import loginErrors from './loginErrors';
import registerErrors from './registerErrors';
import notifications from './notifications';

const reducer = combineReducers({
    user,
    users,
    notifications,
    loginErrors,
    registerErrors,
});

export default reducer;