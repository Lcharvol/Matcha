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
  import { getUser } from './user';
  
  export const getFilter = state => state.tags.filter;
  
  export const getFlattenTags = compose(flatten, pluck('tags'), values);
  export const mergeTags = compose(
    filter(identity),
    reduce((tags, list) => concat(tags, getFlattenTags(list)), []),
  );
  export const doSort = sort(descend(prop(1)));
  export const doFormat = compose(
    map(([tag, elts]) => [tag, elts.length]),
    toPairs,
    groupBy(identity),
  );
  export const regexp = filter => new RegExp(filter, 'i');
  export const doFilter = tfilter =>
    filter(x => !isEmpty(match(regexp(tfilter), x)));
  export const groupByFilterAndSort = (filter, ...lists) =>
    compose(doSort, doFormat, doFilter(filter))(mergeTags(lists));
  export const allTags = (...lists) =>
    compose(sortBy(identity), uniq)(mergeTags(lists));
  
  export const getTags = createSelector(
    [getUser],
    (user) => allTags(user),
  );