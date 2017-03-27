#!/usr/bin/env node
const { asyncNode } = require('../lib');
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

asyncNode(cli.input[0]);

// p(fs.readFile)(cli.input[0], 'utf8')
//   .then()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error('ERROR: failed to compile markdown file');
//     console.error(err);
//     process.exit(-1);
//   });
