'use strict';

const Mongoose = require('mongoose');
const Hoek = require('hoek');


// Connects to a mongoDB database using the 'MONGO_URL' ENV var.

exports.register = (server, options, next) => {

    const url = options.url || process.env.MONGO_URL || 'mongodb://localhost/test';

    Hoek.assert(url, 'Invalid MongoDB URL provided');

    const conn = Mongoose.createConnection(url, options.settings);
    conn.once('open', () => {

        server.log(['info', 'mongo'], 'connected to mongo DB');
        server.app.mongo = Mongoose.connection;

        return next();
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
