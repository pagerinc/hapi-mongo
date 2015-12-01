# rod-mongo
A hapi Mongoose plugin

[![Build Status](https://magnum.travis-ci.com/pagerinc/rod-mongo.svg?token=NDcPJVe9v2Bwqz2z7yDW)](https://magnum.travis-ci.com/pagerinc/rod-mongo)

This plugin provides a [MongoDB connection](http://mongoosejs.com/docs/connections.html) for your Hapi.js server. The configuration settings take the following options:

- `url` - (required) database connection uri, following [MongoDB's specs](https://docs.mongodb.org/manual/reference/connection-string/).
- `settings` - (optional) database connection options, as [described here](http://mongoosejs.com/docs/connections.html#options).

```javascript
const plugin = {
    register: require('@pager/rod-mongo'),
    options: { url: 'mongodb://localhost/test' }
};

server.register(plugin, (err) => {
    
    if (err) {
        throw err;
    }

    // Mongoose connection is now available to your handlers

    const db = server.app.mongo;  // 'db' is now a Mongoose#connection instance
});
```
