# async-node

[![Build Status](http://img.shields.io/travis/fand/async-node.svg?style=flat-square)](https://travis-ci.org/fand/async-node)
[![NPM Version](https://img.shields.io/npm/v/@fand/async-node.svg?style=flat-square)](https://www.npmjs.com/package/@fand/async-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://fand.mit-license.org/)
[![Coverage Status](https://img.shields.io/coveralls/fand/async-node.svg?style=flat-square)](https://coveralls.io/github/fand/async-node?branch=master)

You can write `await`s on top level!

![example](https://cloud.githubusercontent.com/assets/1403842/24457202/7dca1bce-14d0-11e7-9df7-d1a674b46198.png)

## Install

`npm i -g @fand/async-node`

## Usage

`async-node` runs Node.js scripts wrapping them with `async` function.

```
$ cat foo.js
const res = await Promise.resolve('RESOLVED!');
console.log(res);

$ async-node foo.js
RESOLVED!
```

`wrap-with-async` will output transformed script to stdout.

```
$ wrap-with-async foo.js > bar.js
$ cat bar.js
(async function () { const res = await Promise.resolve('RESOLVED!');
console.log(res);
 })().catch(e => {})
```

### LICENSE

MIT
