import {
  bodyParser,
  compress,
  cors,
  errorHandler,
  helmet,
  pino,
  validator,
} from './middlewares';

import { Database } from './database';
import Koa from 'koa';
import { Settings } from './utils';
import { apiRoutes } from './api';

export default class Forema {
  constructor(launchOptions) {
    this.koa = new Koa();
    this.settings = new Settings(launchOptions);
    this.database = new Database(this.settings.database);
  }

  async start() {
    // connect to mongo-db
    await this.database.connect();

    // apply middlewares
    this.koa
      .use(pino(this.settings.logger))
      .use(errorHandler(this.settings.development))
      .use(helmet(this.settings.security))
      .use(compress(this.settings.compression))
      .use(cors(this.settings.origins))
      .use(bodyParser())
      .use(validator())
      .use(apiRoutes(this.database.db));

    // start
    this.koa.listen(this.settings.server, () => {
      console.log('App started!');
    });
  }

  async stop(errorMessage = null) {
    await this.database.disconnect();
    errorMessage && console.log(`App stopped with error: ${errorMessage}`);
    !errorMessage && console.log(`App stopped. See you later!`);
  }
}
