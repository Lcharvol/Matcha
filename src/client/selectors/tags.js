import {
  compose,
  flatten,
  pluck,
  values,
  filter,
  identity,
  reduce,
  concat,
  sort,
  descend,
  prop,
  map,
  toPairs,
  groupBy,
  match,
  isEmpty,
  sortBy,
  uniq,
} from 'ramda';
import { createSelector } from 'reselect';
import { getUsers } from './user';

export const getFlattenTags = compose(flatten, pluck('interest'),  values);

export const mergeTags = compose(
  filter(identity),
  reduce((tags, list) => concat(tags, getFlattenTags(list)), []),
);

export const allTags = (...lists) =>
  compose(sortBy(identity), uniq)(mergeTags(lists));

export const getTags = createSelector(
  [getUsers],
  (users) => allTags(users),
);
