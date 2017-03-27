import test from 'ava';
import { wrapWithAsync, asyncNode } from '../src';

test('wrapWithAsync()', t => {
  t.is(wrapWithAsync('foo'), '(async function () { foo })().catch(e => {})');
});

test('asyncNode() with invalid file', t => {
  return asyncNode('XXXXX').catch(e => {
    t.regex(e.message, /ENOENT/);
  });
});
