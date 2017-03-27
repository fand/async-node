import test from 'ava';
import fs from 'fs';
import { execFileSync } from 'child_process';

test('async-node', t => {
  const actual = execFileSync(`${__dirname}/../bin/cli.js`, [`${__dirname}/input`]).toString();
  t.is(actual, 'RESOLVED!\n', 'CLI executes JavaScript file Correctly');
});

test('async-node with invalid file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`, ['xxxxxx'], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ENOENT/);
});

test('async-node with non-JavaScript file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`, [`${__dirname}/invalid`], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ERROR/);
});

test('async-node -t', t => {
  const actual = execFileSync(`${__dirname}/../bin/cli.js`, ['-t', `${__dirname}/input`]).toString();
  const expected = fs.readFileSync(`${__dirname}/output`, 'utf8');
  t.is(actual, expected, 'CLI transforms JavaScript file Correctly');
});

test('async-node -t with invalid file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`, ['-t', 'xxxxxx'], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ERROR/);
});

test('async-node -t without file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`, ['-t']);
  }, Error);
  t.regex(error.stdout.toString(), /Usage/);
});
