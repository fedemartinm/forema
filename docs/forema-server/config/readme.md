## Forema Server Configuration

Forema Server can have multiple configuration profiles, based on NODE_ENV variable.
Default profiles are `development` and `droduction`.

```bash
\config
    \development
        development configuration files ...
    \production
        production configuration files
```

### Server

The `server.js` file contains koa server options. Supports the following properties:

- **host** Specifies host on which to listen for connections
- **port** Specifies server port.

### Logger

The `logger.js` file contains logger options. Supports the following properties:

- **enabled** Set to false to disable logging. Default value: true.
- **prettyPrint** Enables pretty printing log logs. Default value: false.
