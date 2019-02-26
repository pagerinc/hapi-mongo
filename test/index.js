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
const { it } = lab;
const { expect } = Code;

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
