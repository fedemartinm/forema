import { dirname, join, resolve } from 'path';
import { exists, existsSync } from 'fs';

const LOGGER_FILE = 'logger.json';
const APP_FILE = 'app.json';

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
    const serverSection = this.files[APP_FILE].server || {};
    return {
      /**
       * Specifies server port.
       */
      port: serverSection.port,
      /**
       * Specifies host on which to listen for connections.
       */
      host: serverSection.host,
    };
  }

  /**
   * Koa origins configurations
   */
  get origins() {
    const originsSection = this.files[APP_FILE].origins || {};
    return {
      /**
       * Access-Control-Allow-Origin header, default is request Origin header.
       */
      origin: originsSection.origin,
      /**
       * Access-Control-Allow-Methods header, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'. String or array of verbs.
       */
      allowMethods: originsSection.allowMethods,
      /**
       * Access-Control-Expose-Headers header, string or array.
       */
      exposeHeaders: originsSection.exposeHeaders,
      /**
       * Access-Control-Allow-Headers header, string or array.
       */
      allowHeaders: originsSection.allowHeaders,
      /**
       * Access-Control-Max-Age header, value in seconds.
       */
      maxAge: originsSection.maxAge,
      /**
       * Access-Control-Allow-Credentials header, Boolean value.
       */
      credentials: originsSection.credentials,
    };
  }

  /**
   * Koa security configurations
   */
  get security() {
    const securitySection = this.files[APP_FILE].security || {};
    return {
      /**
       * X-DNS-Prefetch-Controlhader, Stop browsers from doing DNS prefetching.
       * If undefined, default is { allow: false }
       */
      dnsPrefetchControl: securitySection.dnsPrefetchControl,
      /**
       * X-Frame-Options header, Prevent clickjacking.
       * If undefined, default is { action: 'sameorigin' }
       */
      frameguard: securitySection.frameguard,
      /**
       * X-Powered-By header, Hide "X-Powered-By" header.
       * If undefined, default is true
       */
      hidePoweredBy: securitySection.hidePoweredBy,
      /**
       * Strict-Transport-Security header.
       * If undefined, default is { maxAge=15552000, includeSubDomains:true }
       */
      hsts: securitySection.hsts,
      /**
       * Extended options, see helmet
       */
      contentSecurityPolicy: securitySection.contentSecurityPolicy,
      permittedCrossDomainPolicies:
        securitySection.permittedCrossDomainPolicies,
      expectCt: securitySection.expectCt,
      featurePolicy: securitySection.featurePolicy,
      hpkp: securitySection.hpkp,
      noCache: securitySection.noCache,
      referrerPolicy: securitySection.referrerPolicy,
    };
  }

  /**
   * Koa compression configurations
   */
  get compression() {
    const compressionSection = this.files[APP_FILE].compression || {};
    const enabled = compressionSection.compression ?? true;

    let filter = undefined;
    if (enabled === false) {
      filter = () => false;
    }

    return {
      /**
       * Used to enable-disable compression
       */
      filter: filter,
      /**
       * Minimum response size in bytes to compress. If undefined, default is 1024 bytes
       */
      threshold: compressionSection.threshold,
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
    this.readFile(APP_FILE);
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
