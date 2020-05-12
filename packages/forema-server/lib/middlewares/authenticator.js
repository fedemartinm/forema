export default () => {
  // middleware
  return async (ctx, next) => {
    ctx.authenticate = () => {
      if (!ctx.isAuthenticated()) {
        ctx.throw(401, 'Unauthorized');
      }
    };
    await next();
  };
};
