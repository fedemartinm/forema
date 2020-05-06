export default (isDevelopment) => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.log.error('Handling error...');
  }
};
