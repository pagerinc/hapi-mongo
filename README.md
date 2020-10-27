# Hapi-mongo
A hapi Mongoose plugin

![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)

This plugin provides a [MongoDB connection](http://mongoosejs.com/docs/connections.html) for your Hapi.js server. The configuration settings take the following options:

- `url` - (option) database connection uri, following [MongoDB's specs](https://docs.mongodb.org/manual/reference/connection-string/). Defaults to MONGO_URL environment variable
- `settings` - (optional) database connection options, as [described here](http://mongoosejs.com/docs/connections.html#options).

```javascript
const plugin = {
    register: require('@pager/hapi-mongo'),
    options: { url: 'mongodb://localhost/test' }
};

await server.register(plugin); // throws if no connection is possible

// server.app.mongo is exposed
```
