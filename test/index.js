'use strict';

const Code = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');

const Mongo = require('../');

const lab = exports.lab = Lab.script();
const { it, describe, afterEach } = lab;
const { expect } = Code;

let server;

describe('hapi-mongo', () => {

    afterEach(async () => {

        await server.app.mongo.close();
        await server.stop();
        server = null;
    });

    it('can be registered as a plugin', async () => {

        server = Hapi.server();

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

    it('will use process env if no url passed', async () => {

        process.env.MONGO_URL = 'mongodb://localhost/test';
        server = Hapi.server();

        const plugin = {
            plugin: Mongo,
            options: {
                settings: {
                    useNewUrlParser: true
                }
            }
        };

        await server.register(plugin);

        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.close).to.be.a.function();
    });
});
