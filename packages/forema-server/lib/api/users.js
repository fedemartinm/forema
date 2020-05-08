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
    ctx.validate('user.json', ctx.request.body);
    ctx.body = {
      status: 'created',
      data: await catalog.createUser(ctx.request.body),
    };
    ctx.status = 201;
  });

  router.put('users', async (ctx) => {
    ctx.validate('user.json', ctx.request.body);
    ctx.body = {
      status: 'updated',
      data: await catalog.updateUser(ctx.request.body),
    };
  });

  router.delete('users/:id', async (ctx) => {
    ctx.body = {
      status: 'deleted',
      data: await catalog.deleteUser(ctx.params.id),
    };
  });
};
