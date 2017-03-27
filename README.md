# async-node

[![Build Status](http://img.shields.io/travis/fand/async-node.svg?style=flat-square)](https://travis-ci.org/fand/async-node)
[![NPM Version](https://img.shields.io/npm/v/@fand/async-node.svg?style=flat-square)](https://www.npmjs.com/package/@fand/async-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://fand.mit-license.org/)
[![Coverage Status](https://img.shields.io/coveralls/fand/async-node.svg?style=flat-square)](https://coveralls.io/github/fand/async-node?branch=master)

## Install
`npm i -g @fand/async-node`

## Usage

```
$ cat foo.js
const res = await Promise.resolve('RESOLVED!');
console.log(res);

$ async-node foo.js
RESOLVED!
```

### LICENSE
MIT
