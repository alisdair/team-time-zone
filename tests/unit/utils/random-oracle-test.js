import { moduleFor, test } from 'ember-qunit';
import randomOracle from 'stz/utils/random-oracle';

moduleFor('util:random-oracle', 'Unit | Util | random-oracle', {
  subject: randomOracle
});

const fruits = ['apple', 'banana', 'mango'];

test('function returns a random element based on argument', function(assert) {
  assert.expect(5);

  let oracle = this.subject(fruits);
  let first = oracle(1);

  assert.ok(fruits.indexOf(first) !== -1,
            `function returns an element: ${first}`);
  assert.equal(oracle(1), first, 'returns the same element when called again');

  // Find an argument which returns a different element; try 1e6 times
  let i = 1;
  let second;
  do {
    i += 1;
    second = oracle(i);
  } while (second === first && i < 1e6);

  assert.ok(first !== second, 'different argument returns a different element');
  assert.ok(fruits.indexOf(second) !== -1,
            `different argument returns an element: ${second}`);
  assert.equal(oracle(i), second, 'returns the same element when called again');
});
