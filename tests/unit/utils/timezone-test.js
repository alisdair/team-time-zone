import { module, test } from 'qunit';
import { timezoneStart, timezoneNext } from 'ttz/utils/timezone';

module('Unit | Util | timezone');

test('timezoneStart', function(assert) {
  assert.expect(8);

  let subject = timezoneStart;

  assert.equal(subject(0), 0,
               'offset 00:00:00 is in timezone +0000');

  assert.equal(subject(1), 0,
               'offset 00:00:01 is in timezone +0000');

  assert.equal(subject(59 * 60 + 59), 0,
               'offset 00:59:59 is in timezone +0000');

  assert.equal(subject(60 * 60), 60 * 60,
               'offset 01:00:00 is in timezone +0100');

  assert.equal(subject(-1), -(60 * 60),
               'offset -00:00:01 is in timezone -0100');

  assert.equal(subject(-(59 * 60 + 59)), -(60 * 60),
               'offset -00:59:59 is in timezone -0100');

  assert.equal(subject(-(60 * 60)), -(60 * 60),
               'offset -01:00:00 is in timezone -0100');

  assert.equal(subject(-(60 * 60) + 1), -(60 * 60),
               'offset -01:00:01 is in timezone -0200');
});

test('timezoneNext', function(assert) {
  assert.expect(3);

  let subject = timezoneNext;

  assert.equal(subject(0), 3600,
               'next timezone from +0000 is +0100');

  assert.equal(subject(-18000), -14400,
               'next timezone from -0500 is -0400');

  assert.equal(subject(28800), 32400,
               'next timezone from +0800 is +0900');
});
