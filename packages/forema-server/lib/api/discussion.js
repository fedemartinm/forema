/**
 * Discussion apis
 */
import { Discussions } from '../database/catalogs/discussion';

export default (router, database) => {
  const catalog = new Discussions(database);

  router.get('forum/:forumId/discussions', async (ctx) => {
    //Params
    const { forumId } = ctx.params;
    let { sortingMethod, pinned } = ctx.request.query;

    ctx.validate('api_discussions#discussions', {
      forumId,
      pinned,
      sortingMethod,
    });

    ctx.body = {
      status: 'success',
      data: await catalog.getDiscussions(
        forumId,
        pinned == 'true',
        sortingMethod
      ),
    };
  });

  router.get('discussion/:id', async (ctx) => {
    ctx.body = {
      status: 'success',
      data: await catalog.getDiscussion(ctx.params.id),
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

  router.put('discussion/vote/:discussionId', async (ctx) => {
    const { discussionId } = ctx.params;
    const { vote } = ctx.request.body;
    let userId = 'user';

    ctx.validate('api_discussions#vote', {
      discussionId,
      userId,
      vote,
    });
    ctx.body = {
      status: 'updated',
      data: await catalog.vote(discussionId, userId, parseInt(vote)),
    };
  });

  router.put('discussion', async (ctx) => {
    ctx.validate('discussion.json', ctx.request.body);
    ctx.body = {
      status: 'updated',
      data: await catalog.updateDiscussion(ctx.request.body),
    };
  });

  router.delete('discussion/:id', async (ctx) => {
    ctx.body = {
      status: 'deleted',
      data: await catalog.deleteDiscussion(ctx.params.id),
    };
  });
};
