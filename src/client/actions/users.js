export const LOAD_USERS = 'LOAD_USERS';
export const FILTER_USERS = 'FILTER_USERS';
export const SORT_USERS = 'SORT_USERS';

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
