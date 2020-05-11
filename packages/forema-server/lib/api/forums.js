/**
 * Forums apis
 */
import { ForumCatalog } from '../database';

export default (router, database) => {
  const catalog = new ForumCatalog(database);

  router.get('forum/', async (ctx) => {
    ctx.body = {
      status: 'success',
      data: await catalog.getAllForums(),
    };
  });

  router.post('forum', async (ctx) => {
    ctx.validate('forum.json', ctx.request.body);
    ctx.body = {
      status: 'created',
      data: await catalog.createForum(ctx.request.body),
    };
    ctx.status = 201;
  });

  router.put('forum', async (ctx) => {
    ctx.validate('forum.json', ctx.request.body);
    ctx.body = {
      status: 'updated',
      data: await catalog.updateForum(ctx.request.body),
    };
  });

  router.delete('forum/:id', async (ctx) => {
    ctx.body = {
      status: 'deleted',
      data: await catalog.deleteForum(ctx.params.id),
    };
  });
};
