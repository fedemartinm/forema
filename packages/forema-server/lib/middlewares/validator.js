import Ajv from 'ajv';

export default () => {
  console.log('Configurando validator...');
  const validator = new Ajv();

  //middleware
  return async (ctx, next) => {
    ctx.validate = (schema, data) => {
      if (!validator.validate(schema, data)) {
        ctx.throw(400, validator.errorsText());
      }
    };
    await next();
  };
};
