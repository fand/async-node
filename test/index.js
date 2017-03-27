import test from 'ava';
import { wrapWithAsync } from '../src';

test('wrapWithAsync()', t => {
  t.is(wrapWithAsync('foo'), '(async function () { foo })().catch(e => {})');
});
