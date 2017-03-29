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

const filename = cli.input[0];
if (!filename) {
  cli.showHelp(-1);
}

p(fs.readFile)(filename, 'utf8')
  .then(data => {
    console.log(wrapWithAsync(data));
  })
  .catch(err => {
    console.error('ERROR: failed to transform script');
    console.error(err);
    process.exit(-1);
  });
