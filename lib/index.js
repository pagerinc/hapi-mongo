'use strict';

const Mongoose = require('mongoose');


// Connects to a mongoDB database using the 'MONGO_URL' ENV var.

exports.register = (server, options, next) => {

    const url = options.url;

    Mongoose.connect(url, options.settings);
    Mongoose.connection.once('open', () => {

        server.log(['info', 'mongo'], 'connected to mongo DB');

        server.expose('db', Mongoose.connection);
        return next();
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
