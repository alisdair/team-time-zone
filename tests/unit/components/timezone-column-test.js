import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('timezone-column', 'Unit | Component | Timezone Column', {
  unit: true
});

test('groups users by timezone offset', function(assert) {
  assert.expect(4);

  let component = this.subject();

  let halifax = Ember.Object.create({ name: 'Halifax', tzOffset: -10800 });
  let labrador = Ember.Object.create({ name: 'Labrador', tzOffset: -9000 });
  let manaus = Ember.Object.create({ name: 'Manaus', tzOffset: -10800 });

  let users = Ember.A([halifax, labrador, manaus]);
  run(() => component.set('users', users));

  let groups = component.get('groups');
  assert.equal(groups.length, 2,
               'three users with two timezones gives two groups');

  let group;

  group = groups.findBy('timezoneOffset', -9000);
  assert.deepEqual(group.get('users').sortBy('name'),
                   Ember.A([labrador]),
                   'has one user in group with offset -9000');

  group = groups.findBy('timezoneOffset', -10800);
  assert.deepEqual(group.get('users').sortBy('name'),
                   Ember.A([halifax, manaus]),
                   'has two users in group with offset 7200');

  assert.deepEqual(groups.mapBy('timezoneOffset'),
                   [-10800, -9000],
                   'groups are sorted by timezone, most western first');
});
