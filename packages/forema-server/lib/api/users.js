/**
 * Users apis
 */
import { Users } from '../database/catalogs/user';

export default (router, database) => {
  const catalog = new Users(database);

  router.get('users/:id', async (ctx) => {
    ctx.body = {
      status: 'success',
      data: await catalog.getUser(ctx.params.id),
    };
  });

  router.post('users', async (ctx) => {
    ctx.body = {
      status: 'created',
      data: await catalog.createUser(ctx.request.body),
    };
    ctx.status = 201;
  });
};
