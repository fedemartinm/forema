## _ Documentation in progress _

## Providers

In order to allow different backend technologies, forema is divided into forema-web and forema-provider-\* packages. Each provider has the responsibility to manage data storage and authentication.

Default providers are:

- [`forema-provider-node`](forema-server/index.md): works together with package `forema-server` and allows you to use nodejs, mongodb and passport js as backend technologies.
- [`forema-provider-firebase`](forema-firebase/index.md): this package allows you to use firebase serverless services.

Forema provides types and schemes so that you can easily create your own provider.
You can use `forema-provider-base` package as template ([link](https://github.com/fedemartinm/forema/tree/master/packages/forema-provider-base)).
