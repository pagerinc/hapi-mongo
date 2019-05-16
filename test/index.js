'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const Mongo = require('../');

// Declare internals

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const { it, describe } = lab;
const { expect } = Code;

describe('hapi-mongo', () => {

    it('can be registered as a plugin', async () => {

        const server = new Hapi.Server();

        const plugin = {
            plugin: Mongo,
            options: {
                url: 'mongodb://localhost/test',
                settings: {
                    useNewUrlParser: true
                }
            }
        };

        await server.register(plugin);

        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.close).to.be.a.function();
    });

    it('should reset event listeners in mongoose connection on each new registration', async () => {

        const plugin = {
            plugin: Mongo,
            options: {
                url: 'mongodb://localhost/test',
                settings: {
                    useNewUrlParser: true
                }
            }
        };

        let server = new Hapi.Server();
        await server.register(plugin);

        server = new Hapi.Server();
        await server.register(plugin);

        server = new Hapi.Server();
        await server.register(plugin);


        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.listenerCount('disconnected')).to.equal(1);
        expect(server.app.mongo.listenerCount('reconnectFailed')).to.equal(1);
        expect(server.app.mongo.listenerCount('error')).to.equal(1);
    });
});
