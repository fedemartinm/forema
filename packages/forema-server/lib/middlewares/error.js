export default (isDevelopment) => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      status: 'error',
      data: err.message,
    };
  }
};
