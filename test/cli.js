import test from 'ava';
import fs from 'fs';
import { execFileSync } from 'child_process';

test('async-node', t => {
  const actual = execFileSync(`${__dirname}/../bin/async-node.js`, [`${__dirname}/fixtures/input.js`]).toString();
  t.is(actual, 'RESOLVED!\n', 'CLI executes JavaScript file Correctly');
});

test('async-node with invalid file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/async-node.js`, ['xxxxxx'], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ENOENT/);
});

test('async-node with non-JavaScript file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/async-node.js`, [`${__dirname}/fixtures/invalid.js`], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ERROR/);
});

test('async-node with arguments', t => {
  const actual = execFileSync(`${__dirname}/../bin/async-node.js`, [`${__dirname}/fixtures/arguments.js`, 'foo', 'bar']).toString();
  t.is(actual, '["foo","bar"]\n');
});

test('wrap-with-async', t => {
  const actual = execFileSync(`${__dirname}/../bin/wrap-with-async.js`, [`${__dirname}/fixtures/input.js`]).toString();
  const expected = fs.readFileSync(`${__dirname}/fixtures/output.js`, 'utf8');
  t.is(actual, expected, 'CLI transforms JavaScript file Correctly');
});

test('wrap-with-async with invalid file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/wrap-with-async.js`, ['xxxxxx'], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ERROR/);
});

test('wrap-with-async without file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/wrap-with-async.js`);
  }, Error);
  t.regex(error.stdout.toString(), /Usage/);
});
