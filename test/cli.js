import test from 'ava';
import fs from 'fs';
import { execFileSync } from 'child_process';

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
