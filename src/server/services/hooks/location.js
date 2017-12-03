/* eslint-disable */
import _ from 'lodash';
import geolib from 'geolib';

/*
*
* Oui oui je sais, c'est sale, mais j'ai fai ca vite, je repasserai dessu
*
*/

const whichSexe = (sexe, orientation) => {
  if (orientation === 'homosexual') return [sexe];
  if (orientation === 'bisexual') return (['man', 'woman']);
  if (sexe === 'man') return (['woman']);
  else if (sexe === 'woman') return (['man']);
};

export const getFilterAndSort = async (req, res, next) => {
  try {
    req.f = {};
    const { sort, filter } = JSON.parse(req.query.f);
    req.filter = filter;
    req.sort = sort.split(',');
    if (req.sort && !_.includes(['age', 'popularity', 'interest', 'location'], req.sort[0]))
        throw 'try to fuck us';
    req.sortString = '';
    const { by, value } = filter || {};
    const { sexe, sexualorientation } = req.user;
    let filterSexe = "sexe = ANY('{";
    whichSexe(sexe, sexualorientation).forEach(sex => {
      filterSexe = filterSexe.concat(`${sex},`);
    });
    filterSexe = filterSexe.slice(0, -1).concat("}'::text[])");
    if (by === 'age' || by === 'popularity')
      req.filterString = `WHERE ${filterSexe} AND ${by} > ${Number(value)}`;
    else {
      req.filterString = `WHERE ${filterSexe}`;
    }
    if (sort && req.sort[0] !== 'location' && req.sort[0] !== 'interest') {
      if (_.toUpper(req.sort[1]) === 'DESC') {
        req.sortString = `ORDER BY ${_.toLower(req.sort[0])} DESC`;
      } else {
        req.sortString = `ORDER BY ${_.toLower(req.sort[0])} ASC`;
      }
    }
    next();
  } catch (err) {
    console.log('err in GetFilterAndSort', err);
    next();
  }
};

export const getFilterGeoAndInterest = (req, res, next) => {
  try {
    const { users } = req;
    const { interest: myInterest } = req.user;
    const { user } = req;

    const { by: byFilter, value: valueFilter } = req.filter || {};
    req.users = users.map((user, index) => ({ ...user, key: index }));
    let usersSortbyDistance = geolib.orderByDistance(user, req.users).map(userDis => ({ ...userDis, key: Number(userDis.key) }));
    if (req.sort[0] === 'location') {
      if (_.toUpper(req.sort[1]) === 'DESC') usersSortbyDistance = _.reverse(usersSortbyDistance);

      const idKey = usersSortbyDistance.map(({ key }) => key);
      const sortby = _.sortBy(req.users, ({ key }) => _.indexOf(idKey, key));
      req.users = _.map(sortby, (userSorted, index) => ({ ...userSorted, distance: usersSortbyDistance[index].distance }));
    }
    if (req.sort[0] === 'interest') {
      let sortbyInterest = _.sortBy(req.users, ({ interest }) => _.intersection(interest, myInterest).length);
      if (_.toUpper(req.sort[1]) === 'DESC') sortbyInterest = _.reverse(sortbyInterest);
      req.users = sortbyInterest;
    }
    if (!byFilter)
    if (byFilter === 'interest') {
      req.users = _.filter(req.users, ({ interest }) => _.intersection(interest, myInterest).length >= Number(valueFilter));
    }
    if (byFilter === 'location') {
      req.users = _.filter(
        _.map(
          req.users,
          (user, index) => ({ ...user, distance: usersSortbyDistance[index].distance }),
        ),
        (({ distance }) => {
          return (distance <= Number(valueFilter) * 1000);
        }),
      );
    }
    next();
  } catch (err) {
    req.Err({ details: 'Fail to get location and intereet sort and filter' }, err);
  }
};
