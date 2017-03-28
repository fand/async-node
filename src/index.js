import fs from 'fs';
import { exec } from 'child_process';
import tempWrite from 'temp-write';
import p from 'pify';

export function wrapWithAsync (script) {
  return '(async function () { ' + script + ' })().catch(e => {})';
}

export function asyncNode (filename) {
  let tmppath;
  let out;

  return p(fs.readFile)(filename, 'utf8')
    .then(data => {
      const script = wrapWithAsync(data);
      return tempWrite(script);
    })
    .then(path => {
      tmppath = path;
      return p(exec)(`NODE_PATH=$(pwd)/node_modules node ${path}`);
    })
    .then(o => {
      out = o;
    })
    .then(() => {
      return p(fs.unlink)(tmppath);
    })
    .then(() => out);
}
