/**
 * Overview api
 */
import { ForemaCatalog } from '../database';

export default (router, database) => {
  const catalog = new ForemaCatalog(database);

  router.get('overview', async (ctx) => {
    ctx.body = {
      status: 'success',
      data: await catalog.getOverview(),
    };
  });
};
