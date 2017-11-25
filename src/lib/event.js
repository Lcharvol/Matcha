/* eslint-disable */
import user from '../server/services/user';
import userSchema from '../server/services/user.json';
import { Router } from 'express';
import _ from 'lodash';

// _delete because delete is a reserver method
const REST = ['post', 'put', '_delete', 'get', 'delete'];

const router = Router();

const switchEvent = (req, res) => {
    const routes = _.reduce(user.service, (acc, method, key) => {
      let verbName = undefined;
      let urlPathExtends = undefined;
      if (_.includes(REST, method.name)) {
        verbName = _.startsWith(method.name,'_') ? _.trimStart(method.name, '_') : method.name;
      } else {
        verbName = userSchema[method.name].verb;
        urlPathExtends = userSchema[method.name].url;
      }
      return ({...acc, [key]: {
          method,
          verbName,
          urlPath: !urlPathExtends ? `/${user.name}` : `/${user.name}${urlPathExtends}`,
          beforeHooks: _.includes(REST, method.name) ? user.before[verbName] : user.before[method.name],
          afterHook: _.includes(REST, method.name) ? user.after[verbName] : user.after[method.name],
        }});
    }, {});
    _.forEach(routes, (route) => {
      const { beforeHooks, afterHook, method, verbName, urlPath} = route
      const middleware = beforeHooks ? Object.values(beforeHooks) : [];
      middleware.push(method);
      if (afterHook) middleware.push(afterHook);
      // console.log(verbName, urlPath, middleware);
      router[verbName](urlPath, middleware);
    });
    return router;
};

export default switchEvent();
