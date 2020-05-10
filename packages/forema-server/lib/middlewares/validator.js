import Ajv from 'ajv';
import apiDiscussions from '../schemas/api_discussions';
import discussionSchema from 'shared/schemas/discussion.json';
import forumSechema from 'shared/schemas/forum.json';
import opinionSchema from 'shared/schemas/opinion.json';
import userSchema from 'shared/schemas/user.json';

export default () => {
  // load and compile schemas
  var validator = new Ajv({
    schemas: [
      userSchema,
      forumSechema,
      discussionSchema,
      opinionSchema,
      ...apiDiscussions,
    ],
  });

  // middleware
  return async (ctx, next) => {
    ctx.validate = (schema, data) => {
      if (!validator.validate({ $schema: schema, ...data })) {
        ctx.throw(400, validator.errorsText());
      }
    };
    await next();
  };
};
