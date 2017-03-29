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

// Can't use cli.input be cause it removes options in process.argv.
const [filename, ...args] = Array.from(process.argv).slice(2);

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
