import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('timezone-collection', 'Unit | Component | Timezone Collection', {
  unit: true
});

function buildUsers(...offsets) {
  return Ember.A(offsets).map((offset, i) => {
    return Ember.Object.create({
      name: `User ${i}`,
      tzOffset: offset
    });
  });
}

test('calculates earliest and latest timezone', function(assert) {
  assert.expect(2);

  let users = buildUsers(3600, -10800, 28800, 3600, 7200);
  let component = this.subject();
  Ember.run(() => component.set('users', users));

  assert.equal(component.get('earliest'), -10800,
               'calculates earliest timezone');
  assert.equal(component.get('latest'), 28800,
               'calculates latest timezone');
});

test('groups users into columns', function(assert) {
  assert.expect(10);

  let users = buildUsers(0, -12600, 3600, 0, -14400);
  let component = this.subject();
  Ember.run(() => component.set('users', users));

  let columns = component.get('columns');

  assert.equal(columns.length, 6, 'creates 6 columns');

  assert.equal(columns[0].get('timezoneStart'), -14400,
               'column 0 starts at -0400');
  assert.deepEqual(columns[0].get('users'), [users[1], users[4]],
                   'column 0 has users at -0330 and -0400');

  assert.equal(columns[1].get('users').length, 0,
               'column 1 is empty');
  assert.equal(columns[2].get('users').length, 0,
               'column 2 is empty');
  assert.equal(columns[3].get('users').length, 0,
               'column 3 is empty');

  assert.equal(columns[4].get('timezoneStart'), 0,
               'column 4 starts at +0000');
  assert.deepEqual(columns[4].get('users'), [users[0], users[3]],
                   'column 4 has 2 users at +0000');

  assert.equal(columns[5].get('timezoneStart'), 3600,
               'column 5 starts at +0100');
  assert.deepEqual(columns[5].get('users'), [users[2]],
                   'column 5 has 1 user at +0100');
});
