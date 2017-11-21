import _ from 'lodash';
import geolib from 'geolib';
import { reach } from 'yup';

/*
*
* Oui oui je sais, c'est sale, mais j'ai fai ca vite, je repasserai dessu
*
*/
// suggestion: [sortGeoLoc, reduceUsers, buildUsers],
const whichSexe = (sexe, orientation) => {
  if (orientation === 'homosexual') return [sexe];
  if (orientation === 'bisexual') return (['man', 'woman']);
  if (sexe === 'man') return (['woman']);
  else if (sexe === 'woman') return (['man']);
};
// good sql = SELECT * FROM "public"."users" WHERE age BETWEEN 18 AND 25 AND popularity BETWEEN 18 AND 35 AND sexe = ANY('{man,woman}'::text[])
export const getFilterAndSort = async (req, res, next) => {
  try {
    let filterAge = '';
    let filterPopularity = '';
    req.f = {};

    const { sort, filter } = JSON.parse(req.query.f);
    req.filter = filter;
    req.sort = sort.split(',');
    console.log(req.sort);
    req.sortString = '';
    const { age, popularity } = filter || {};
    const { sexe, sexualorientation } = req.user;
    let filterSexe = "sexe = ANY('{";
    whichSexe(sexe, sexualorientation).forEach(sex => {
      filterSexe = filterSexe.concat(`${sex},`);
    });
    filterSexe = filterSexe.slice(0, -1).concat("}'::text[])");
    if (age) {
      const [min, max] = age.split('-');
      filterAge = `age BETWEEN ${min} AND ${max}`;
    }
    if (popularity) {
      const [min, max] = popularity.split('-');
      filterPopularity = `popularity BETWEEN ${min} AND ${max}`;
    }
    if (age && popularity) {
      req.filterString = `WHERE ${filterAge} AND ${filterPopularity}`;
    } else if (age) {
      req.filterString = `WHERE ${filterAge}`;
    } else if (popularity) {
      req.filterString = `WHERE ${filterPopularity}`;
    }

    if (age || popularity) {
      req.filterString = `${req.filterString} AND ${filterSexe}`;
    } else {
      req.filterString = `WHERE ${filterSexe}`;
    }
    if (sort && req.sort[0] !== 'location') {
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
    const { interest: interestCount, location: locationFilter } = req.filter || {};
    const { users } = req;
    const { interest: myInterest } = req.user;
    const { user } = req;
    let usersSortbyDistance = geolib.orderByDistance(user, users).map(userDis => ({ ...userDis, key: Number(userDis.key) }));

    if (req.sort[0] === 'location') {
      if (req.sort[1] === 'DESC') usersSortbyDistance = _.reverse(usersSortbyDistance);
      const idKey = usersSortbyDistance.map(({ key }) => key);
      const sortby = _.sortBy(users, ({ id }) => _.indexOf(idKey, id));
      req.users = _.map(sortby, (userSorted, index) => ({ ...userSorted, distance: usersSortbyDistance[index].distance }));
    }
    if (!interestCount && !locationFilter) return res.json({ details: users });
    if (interestCount) {
      req.users = _.filter(users, ({ interest }) => _.intersection(interest.split(','), myInterest.split(',')).length >= interestCount);
    }
    if (locationFilter) {
      req.users = _.filter(
        _.map(
          req.users,
          (user, index) => ({ ...user, distance: usersSortbyDistance[index].distance }),
        ),
        ({ distance }) => (distance <= locationFilter),
      );
    }
    return res.json({ details: req.users });
  } catch (err) {
    req.Err({ details: 'Fail to get location and intereet sort and filter' }, err);
  }
};
