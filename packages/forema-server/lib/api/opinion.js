/**
 * Discussion apis
 */
import { OpinionCatalog } from '../database/catalogs/opinion';

export default (router, database) => {
  const catalog = new OpinionCatalog(database);

  router.get('discussion/:discussionId/opinions', async (ctx) => {
    //Params
    const { discussionId } = ctx.params;

    ctx.body = {
      status: 'success',
      data: await catalog.getAllOpinions(discussionId),
    };
  });

  router.post('opinion', async (ctx) => {
    ctx.validate('opinion.json', ctx.request.body);
    ctx.body = {
      status: 'created',
      data: await catalog.createOpinion(ctx.request.body),
    };
    ctx.status = 201;
  });

  router.put('opinion/vote/:opinionId', async (ctx) => {
    const { opinionId } = ctx.params;
    const { vote } = ctx.request.body;
    let userId = 'user';

    ctx.validate('api_opinions#vote', {
      opinionId,
      userId,
      vote,
    });
    ctx.body = {
      status: 'updated',
      data: await catalog.vote(opinionId, userId, parseInt(vote)),
    };
  });

  router.put('opinion', async (ctx) => {
    ctx.validate('opinion.json', ctx.request.body);
    ctx.body = {
      status: 'updated',
      data: await catalog.updateOpinion(ctx.request.body),
    };
  });

  router.delete('opinion/:id', async (ctx) => {
    ctx.body = {
      status: 'deleted',
      data: await catalog.deleteOpinion(ctx.params.id),
    };
  });
};
