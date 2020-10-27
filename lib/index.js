'use strict';

const Mongoose = require('mongoose');
const Hoek = require('@hapi/hoek');

const settingsDefaults = {
    useUnifiedTopology: true
};

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const url = options.url || process.env.MONGO_URL;
        Hoek.assert(url, 'Invalid MongoDB URL provided');

        Mongoose.connection.removeAllListeners('disconnected');
        Mongoose.connection.removeAllListeners('reconnectFailed');
        Mongoose.connection.removeAllListeners('error');

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

        const returnPromise = new Promise(((resolve, reject) => {

            Mongoose.connection.once('open', () => {

                server.log(['info', 'mongo'], 'connected to mongo DB');
                server.app.mongo = Mongoose.connection;
                resolve();
            });
            Mongoose.connection.on('error', (error) => {

                /* $lab:coverage:off$ */
                server.log(['error', 'mongo'], 'Error on MongoDB connection');
                reject(error);
                /* $lab:coverage:on$ */
            });
        }));

        await Mongoose.connect(url, Object.assign({}, settingsDefaults, options.settings));

        return returnPromise;
    }
};
