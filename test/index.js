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


it('can be registered as a plugin with provided url', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
        register: Mongo,
        options: { url: 'mongodb://localhost/test' }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.close).to.be.a.function();

        return done();
    });
});

it('can be registered without provided url or env var', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
        register: Mongo
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.close).to.be.a.function();

        return done();
    });
});

it('can be registered without provided url but env var set', (done) => {

    const server = new Hapi.Server();
    process.env.MONGO_URL = 'mongodb://localhost/test';
    server.connection();

    const plugin = {
        register: Mongo
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.mongo).to.exist();
        expect(server.app.mongo.close).to.be.a.function();

        return done();
    });
});


