import Koa from 'koa';
import Router from 'koa-router';
import { Settings } from './utils';
import bodyParser from 'koa-body';
import compress from 'koa-compress';
import cors from '@koa/cors';
import errorHandler from './middleware/error';
import helmet from 'koa-helmet';
import pino from 'koa-pino-logger';

export default class Forema {
  constructor(launchOptions) {
    this.koa = new Koa();
    this.router = new Router();
    this.settings = new Settings(launchOptions);
  }

  start() {
    this.router.get('/', (ctx, next) => {
      ctx.body = 'Pep';
    });
    this.koa
      .use(pino(this.settings.logger))
      .use(errorHandler(this.settings.development))
      .use(helmet(this.settings.security))
      .use(compress(this.settings.compression))
      .use(cors(this.settings.origins))
      .use(bodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods());

    this.koa.listen(this.settings.server);
  }

  stop(errorMessage = null) {
    errorMessage && console.log(`App stopped with error: ${errorMessage}`);
    !errorMessage && console.log(`App stopped. See you later!`);
  }
}
