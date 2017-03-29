#!/usr/bin/env node
const { asyncNode } = require('../lib');
const semver = require('semver');
const meow = require('meow');

const usage = `
  Usage
    $ async-node <script>

  Example
    $ async-node foo.js
`;

// Split args by filename
const args = Array.from(process.argv);
const i = args.slice(2).findIndex(x => x.match(/^[^-]/));  // index of filename
const cliArgs = i === -1 ? args : args.slice(0, i + 3);
const userArgs = i === -1 ? [] : args.slice(i + 2);
const filename = userArgs.shift();

const cli = meow({
  argv: cliArgs,
  help: usage,
}, {
  alias: {
    h: 'help',
    v: 'version',
  },
});

if (!filename) {
  cli.showHelp(-1);
}

if (!semver.satisfies(process.version, '>=7.6.0')) {
  console.error(`ERROR: async-node only works on Node.js >= 7.6.0`);
  process.exit(-1);
}

asyncNode(filename, userArgs)
  .then(data => {
    process.stdout.write(data);
  })
  .catch(err => {
    console.error('ERROR: failed to execute script');
    console.error(err);
    process.exit(-1);
  });
