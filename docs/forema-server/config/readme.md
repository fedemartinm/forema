## Forema Server Configuration

Forema Server can have multiple configuration profiles, based on NODE_ENV variable.
Default profiles are `development` and `production`.

```bash
\config
    \development
        development configuration files ...
    \production
        production configuration files
```

### App

The `app.json` file contains all koa server options. It is divided in 4 sub-regions.

### App.server

- **host** Specifies host on which to listen for connections
- **port** Specifies server port.

### App.origins

- **origin** `Access-Control-Allow-Origin` header, default is request Origin header
- **allowMethods** `Access-Control-Allow-Methods` header, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'. String or array of verbs.
- **exposeHeaders** `Access-Control-Expose-Headers` header, string or array.
- **allowHeaders** `Access-Control-Allow-Headers` header, string or array.
- **maxAge** `Access-Control-Max-Age` header, value in seconds.
- **credentials** `Access-Control-Allow-Credentials` header, Boolean value.

### App.security

- **dnsPrefetchControl** `X-DNS-Prefetch-Control`hader, Stop browsers from doing DNS prefetching. Default: { allow: false }
- **frameguard** `X-Frame-Options` header, Prevent clickjacking. Default: { action: 'sameorigin' }
- **hidePoweredBy** `X-Powered-By` header, Hide "X-Powered-By" header. Default: true
- **hsts** `Strict-Transport-Security` header, Default: { maxAge=15552000, includeSubDomains:true }

See helmet for advanced options: `contentSecurityPolicy`, `permittedCrossDomainPolicies`, `expectCt`, `featurePolicy`, `hpkp`, `noCache`, `referrerPolicy`.

### App.compression

- **enabled** Set to false to disable compression. Default value: true.
- **threshold** Minimum response size in bytes to compress. Default 1024 bytes

### Database

The `database.json` file contains mongo-db settings.

- **url** URL used to connect to MongoDB.
- **database** Database name.
- **options** Optional. See http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html#.connect

### Logger

The `logger.json` file contains logger options. Supports the following properties:

- **enabled** Set to false to disable logging. Default value: true.
- **prettyPrint** Enables pretty printing log logs. Default value: false.
