#!/usr/bin/env node
const { asyncNode } = require('../lib');
const semver = require('semver');
const meow = require('meow');
const usage = `
  Usage
    $ async-node <input>

  Example
    $ async-node foo.js
`;
const cli = meow(usage);

if (!cli.input[0]) {
  cli.showHelp(-1);
}

if (!semver.satisfies(process.version, '>=7.6.0')) {
  console.error(`async-node only works on Node.js >= 7.6.0`);
  process.exit(-1);
}

asyncNode(cli.input[0]);
