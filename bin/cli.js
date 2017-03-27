#!/usr/bin/env node
const { wrapWithAsync, asyncNode } = require('../lib');
const fs = require('fs');
const semver = require('semver');
const p = require('pify');
const meow = require('meow');

const usage = `
  Usage
    $ async-node <input>

	Options
	  --transform, -t  Output transformed script

  Example
    $ async-node foo.js
`;
const cli = meow(usage, {
  alias: {
    t: 'transform',
  },
});

const target = cli.input[0] || cli.flags.t;
if (!target || typeof target !== 'string') {
  cli.showHelp(-1);
}

if (!semver.satisfies(process.version, '>=7.6.0')) {
  console.error(`ERROR: async-node only works on Node.js >= 7.6.0`);
  process.exit(-1);
}

if (cli.flags.transform) {
  p(fs.readFile)(cli.flags.transform, 'utf8')
    .then(data => {
      console.log(wrapWithAsync(data));
    })
    .catch(err => {
      console.error('ERROR: failed to transform script');
      console.error(err);
      process.exit(-1);
    });
} else {
  asyncNode(cli.input[0])
    .then(data => {
      process.stdout.write(data);
    })
    .catch(err => {
      console.error('ERROR: failed to execute script');
      console.error(err);
      process.exit(-1);
    });
}
