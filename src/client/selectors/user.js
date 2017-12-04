import { pick, compose, filter } from 'ramda';

export const getUser = state => state.user.details;
export const getUsers = state => state.users.details;
export const getFilter = state => state.users.filter;
export const getSort = state => state.users.sort;
export const getSearch = state => state.users.search;
export const getProfilPictureById = (state, id) => compose(
    pick('profile_picture'),
    filter(user => user.id === id, state.users.details)
);