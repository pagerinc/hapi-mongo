# Hapi-mongo
A hapi Mongoose plugin

[![Build Status](https://magnum.travis-ci.com/pagerinc/hapi-mongo.svg?token=NDcPJVe9v2Bwqz2z7yDW)](https://magnum.travis-ci.com/pagerinc/hapi-mongo)

This plugin provides a [MongoDB connection](http://mongoosejs.com/docs/connections.html) for your Hapi.js server. The configuration settings take the following options:

- `url` - (required) database connection uri, following [MongoDB's specs](https://docs.mongodb.org/manual/reference/connection-string/).
- `settings` - (optional) database connection options, as [described here](http://mongoosejs.com/docs/connections.html#options).

```javascript
const plugin = {
    register: require('@pager/hapi-mongo'),
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

# Versions
 - Use v5.x.x in consumers using Hapi 16.
 - Use v6.x.x in consumers using Hapi 18+.

# Notes

If you need to commit a change for consumers using Hapi 16, commit the change as a minor/patch to v5.x.x.  If the change also makes sense for Hapi 18+, commit the change to v6.x.x as well.
