/**
 * Discussion apis
 */
import { Discussions } from '../database/catalogs/discussion';

export default (router, database) => {
  const catalog = new Discussions(database);

  router.get('forum/:forum_id/discussions', async (ctx) => {
    //params
    const { sorting, pinned } = ctx.request.query;
    const forumId = ctx.params.forum_id;

    ctx.body = {
      status: 'success',
      data: await catalog.getDiscussions(forumId, pinned, sorting),
    };
  });

  router.post('discussion', async (ctx) => {
    ctx.validate('discussion.json', ctx.request.body);
    ctx.body = {
      status: 'created',
      data: await catalog.createDiscussion(ctx.request.body),
    };
    ctx.status = 201;
  });

  /** *router.put('discussion', async (ctx) => {
    ctx.validate('forum.json', ctx.request.body);
    ctx.body = {
      status: 'updated',
      data: await catalog.updateForum(ctx.request.body),
    };
  });

  router.delete('discussion/:id', async (ctx) => {
    ctx.body = {
      status: 'deleted',
      data: await catalog.deleteForum(ctx.params.id),
    };
  });*/
};
