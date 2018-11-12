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
const it = lab.it;
// const before = lab.before;
// const beforeEach = lab.beforeEach;
// const after = lab.after;
// const afterEach = lab.afterEach;
const expect = Code.expect;

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

    const err = await server.register(plugin);

    expect(err).to.not.exist();
    expect(server.app.mongo).to.exist();
    expect(server.app.mongo.close).to.be.a.function();
});
