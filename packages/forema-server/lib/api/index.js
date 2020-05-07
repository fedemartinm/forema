import Router from 'koa-router';
import compose from 'koa-compose';
import users from './users';

/**
 * Register api routes
 */
export const apiRoutes = (database) => {
  const router = new Router({
    prefix: `/api/`,
  });
  //Sub-apis
  users(router, database);

  return compose([router.routes(), router.allowedMethods()]);
};
