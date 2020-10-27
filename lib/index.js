'use strict';

const Mongoose = require('mongoose');
const Hoek = require('hoek');

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const url = options.url || process.env.MONGO_URL;
        Hoek.assert(url, 'Invalid MongoDB URL provided');

        Mongoose.connection.removeAllListeners('disconnected');
        Mongoose.connection.removeAllListeners('reconnectFailed');
        Mongoose.connection.removeAllListeners('error');

        Mongoose.connection.once('open', () => {

            server.log(['info', 'mongo'], 'connected to mongo DB');
            server.app.mongo = Mongoose.connection;
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

        await Mongoose.connect(url, options.settings);
    }
};
