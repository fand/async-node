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

const [filename, ...args] = cli.input;
if (!filename) {
  cli.showHelp(-1);
}

if (!semver.satisfies(process.version, '>=7.6.0')) {
  console.error(`ERROR: async-node only works on Node.js >= 7.6.0`);
  process.exit(-1);
}

asyncNode(filename, args)
  .then(data => {
    process.stdout.write(data);
  })
  .catch(err => {
    console.error('ERROR: failed to execute script');
    console.error(err);
    process.exit(-1);
  });
