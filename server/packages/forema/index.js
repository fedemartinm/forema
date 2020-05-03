const Koa = require('koa');
const app = new Koa();

const errorMiddleware = require('./middleware/error');

app.use(errorMiddleware);
// response
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
