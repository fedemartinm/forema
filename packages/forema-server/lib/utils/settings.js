import { dirname, join, resolve } from 'path';
import { exists, existsSync } from 'fs';

const LOGGER_FILE = 'logger.json';
const SERVER_FILE = 'server.json';

export default class Settings {
  /**
   * Logger configurations
   */
  get logger() {
    return {
      /**
       * Set to false to disable logging. Default value: true.
       */
      enabled: this.files[LOGGER_FILE].enabled ?? true,
      /**
       * Enables pretty printing log logs. Default value: false.
       */
      prettyPrint: this.files[LOGGER_FILE].prettyPrint ?? false,
    };
  }

  /**
   * Koa server configurations
   */
  get server() {
    return {
      /**
       * Specifies server port.
       */
      port: this.files[SERVER_FILE].port,
      /**
       * Specifies host on which to listen for connections.
       */
      host: this.files[SERVER_FILE].host,
    };
  }

  //#region Loader

  constructor({ development = false }: any) {
    this.development = development;
    this.enviroment = development ? 'development' : 'production';

    //Paths
    this.configPath = join(__dirname, '../../config/');
    this.enviromentPath = join(this.configPath, this.enviroment);

    //Init
    this.files = [];
    this.load();
  }

  load() {
    this.checkEnviroment();
    this.readFile(LOGGER_FILE);
    this.readFile(SERVER_FILE);
  }

  checkEnviroment() {
    this.development &&
      console.log(`Verifying enviroment path: ${this.enviromentPath}`);
    if (existsSync(this.enviromentPath)) return;
    else throw new Error(`Missing ${this.enviromentPath} folder.`);
  }

  readFile(file) {
    const filePath = join(this.enviromentPath, file);
    this.development && console.log(`Loading ${filePath}`);
    if (!existsSync(filePath)) throw new Error(`Missing file:${filePath}`);

    this.files[file] = require(filePath);
  }

  //#endregion
}
