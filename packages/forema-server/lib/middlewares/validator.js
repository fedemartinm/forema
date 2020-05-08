import Ajv from 'ajv';
import discussionSchema from 'shared/schemas/Discussion.json';
import forumSechema from 'shared/schemas/Forum.json';
import opinionSchema from 'shared/schemas/opinion.json';
import userSchema from 'shared/schemas/user.json';

export default () => {
  // load and compile schemas
  var validator = new Ajv({
    schemas: [userSchema, forumSechema, discussionSchema, opinionSchema],
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
