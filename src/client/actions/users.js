export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USER = 'LOAD_USER';
export const CONNECTED_USER = 'CONNECTED_USER';
export const DISCONNECT_USER = 'DISCONNECT_USER';
export const FILTER_USERS = 'FILTER_USERS';
export const SORT_USERS = 'SORT_USERS';
export const UPDATE_SEARCH_USERS_TYPE = 'UPDATE_SEARCH_USERS_TYPE';
export const UPDATE_SEARCH_USERS_VALUE = 'UPDATE_SEARCH_USERS_VALUE';
export const SEARCH_USERS = 'SEARCH_USERS';

export const updateSearchUsersType = searchBy => ({
  type: UPDATE_SEARCH_USERS_TYPE,
  searchBy,
})

export const updateSearchUsersValue = value => ({
  type: UPDATE_SEARCH_USERS_VALUE,
  value,
})

export const searchUsers = () => ({ type: SEARCH_USERS });

export const getConnectedUsers = usersConnected => ({ type: CONNECTED_USER, usersConnected });

export const disconnectUser = () => ({ type: DISCONNECT_USER });

export const loadUser = user => ({ type: LOAD_USER, user });

export const loadUsers = users => ({ type: LOAD_USERS, users });

export const sortUsers = sortBy => ({
  type: SORT_USERS,
  sortBy,
});

export const filterUsers = filter => ({
  type: FILTER_USERS,
  filter,
});

