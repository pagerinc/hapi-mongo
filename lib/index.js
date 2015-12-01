'use strict';

const Mongoose = require('mongoose');
const Hoek = require('hoek');


// Connects to a mongoDB database using the 'MONGO_URL' ENV var.

exports.register = (server, options, next) => {

    const url = options.url;
    Hoek.assert(url, 'Invalid MongoDB URL provided');

    Mongoose.connect(url, options.settings);
    Mongoose.connection.once('open', () => {

        server.log(['info', 'mongo'], 'connected to mongo DB');
        server.app.mongo = Mongoose.connection;

        return next();
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
