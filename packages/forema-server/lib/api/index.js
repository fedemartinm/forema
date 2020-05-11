import Router from 'koa-router';
import compose from 'koa-compose';
import discussion from './discussion';
import forums from './forums';
import opinion from './opinion';
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
  forums(router, database);
  discussion(router, database);
  opinion(router, database);

  return compose([router.routes(), router.allowedMethods()]);
};
