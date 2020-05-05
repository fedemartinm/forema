import Koa from 'koa';
import Router from 'koa-router';
import errorHandler from './middleware/error';

export default class Forema {
  constructor(launchOptions) {
    this.koa = new Koa();
    this.router = new Router();
  }

  start() {
    this.router.get('/', (ctx, next) => {
      ctx.body = 'Pep';
      console.log('GET');
    });
    this.koa
      .use(errorHandler) //
      .use(this.router.routes()) //
      .use(this.router.allowedMethods());

    this.koa.listen(3000);
  }

  stop(errorMessage = null) {
    errorMessage && console.log(`App stopped with error: ${errorMessage}`);
    !errorMessage && console.log(`App stopped. See you later!`);
  }
}
