'use strict';

const Mongoose = require('mongoose');
const Hoek = require('hoek');


// Connects to a mongoDB database using the 'MONGO_URL' ENV var.

exports.register = (server, options, next) => {

    const url = options.url;
    Hoek.assert(url, 'Invalid MongoDB URL provided');

    Mongoose.Promise = global.Promise;
    Mongoose.connect(url, options.settings);
    Mongoose.connection.once('open', () => {

        server.log(['info', 'mongo'], 'connected to mongo DB');
        server.app.mongo = Mongoose.connection;

        return next();
    });
    Mongoose.connection.on('disconnected', () => {

        /* $lab:coverage:off$ */
        server.log(['info', 'mongo'], 'Disconnected from DB');
        /* $lab:coverage:on$ */
    });
    Mongoose.connection.on('reconnectFailed', () => {

        /* $lab:coverage:off$ */
        server.log(['error', 'mongo'], 'Failed trying to reconnect to MongoDB!');
        throw new Error('Failed trying to reconnect to MongoDB!');
        /* $lab:coverage:on$ */
    });
    Mongoose.connection.on('error', (error) => {

        /* $lab:coverage:off$ */
        server.log(['error', 'mongo'], 'Error on MongoDB connection');
        throw error;
        /* $lab:coverage:on$ */
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
