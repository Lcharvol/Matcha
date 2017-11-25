export const LOAD_USERS = 'LOAD_USERS';
export const CONNECTED_USER = 'CONNECTED_USER';
export const DISCONNECT_USER = 'DISCONNECT_USER';
export const FILTER_USERS = 'FILTER_USERS';
export const SORT_USERS = 'SORT_USERS';
export const SEARCH_USERS = 'SEARCH_USERS';

export const searchUsers = searchBy => ({
  type: SEARCH_USERS,
  searchBy,
})
export const getConnectedUsers = usersConnected => {
  return { type: CONNECTED_USER, usersConnected };
};

export const disconnectUser = () => {
  return { type: DISCONNECT_USER };
};

export const loadUsers = users => {
  return { type: LOAD_USERS, users };
};

export const sortUsers = sortBy => ({
  type: SORT_USERS,
  sortBy,
});

export const filterUsers = filter => ({
  type: FILTER_USERS,
  filter,
});

