#!/usr/bin/env node
const { wrapWithAsync } = require('../lib');
const fs = require('fs');
const p = require('pify');
const meow = require('meow');

const usage = `
  Usage
    $ wrap-with-async <input>

  Example
    $ wrap-with-async foo.js
`;
const cli = meow(usage);

const target = cli.input[0];
if (!target) {
  cli.showHelp(-1);
}

p(fs.readFile)(cli.input[0], 'utf8')
  .then(data => {
    console.log(wrapWithAsync(data));
  })
  .catch(err => {
    console.error('ERROR: failed to transform script');
    console.error(err);
    process.exit(-1);
  });
