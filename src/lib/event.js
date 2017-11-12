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
    const pathUrl = `/${route.name}`;
    R.map((verb) => {
      const routeDetails = {
          verb,
          verbName: verb.name,
          url: pathUrl,
          name: route.name,
          before: route.before[verb.name],
      };
      finalRoutes.push(routeDetails);
    }, route.service);
  });

  finalRoutes.forEach(route => {
    const { verbName, url, before, verb} = route;
    const hooks = before ? Object.values(before) : [];
    hooks.push(verb);
    router[route.verbName](route.url, hooks);
  });
  return router;
};

export default init();
