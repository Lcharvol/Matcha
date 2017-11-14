/* eslint-disable */
import user from '../server/http/services/user';
import { Router } from 'express';
import R from 'ramda';

const router = Router();

const init = (req, res) => {
  const routes = [];

  const finalRoutes = [];
  routes.push(user);
  routes.forEach(route => {
    R.map((verb) => {
      const nameSplit = R.split('$', verb.name);
      const url = nameSplit[1] ? `/${route.name}/${nameSplit === 'id' ? ':' : ''}${nameSplit[1]}` : `/${route.name}`;
      const routeDetails = {
        verb,
        verbName: nameSplit[0],
        url,
        name: route.name,
        before: route.before[verb.name[0] === '_' ? verb.name[0].split(1) : verb.name],
        after: route.after[verb.name[0] === '_' ? verb.name[0].split(1) : verb.name],
      };
      finalRoutes.push(routeDetails);
    }, route.service);
  });
  finalRoutes.forEach(route => {
    // console.log(route);
    let { verbName, url, before, verb, after} = route;
    const hooks = before ? Object.values(before) : [];
    hooks.push(verb);
    if (typeof after === 'function')
      hooks.push(after);
    if (verbName === '_delete') verbName = 'delete';
    router[verbName](route.url, hooks);
  });
  return router;
};

export default init();
