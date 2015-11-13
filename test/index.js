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


it('can be registered as a plugin', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugin = {
        register: Mongo,
        options: { url: 'mongodb://localhost/test' }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.plugins['@pager/rod-mongo'].db).to.exist();

        return done();
    });
});
