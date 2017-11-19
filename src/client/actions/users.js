export const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = users => {
  return { type: LOAD_USERS, users };
};