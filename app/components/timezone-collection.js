import Ember from 'ember';
import { timezoneStart, timezoneNext } from 'ttz/utils/timezone';

function usersInTimezone(users, tz) {
  return users.filter(function(user) {
    let offset = user.get('tzOffset');
    return offset >= tz && offset < timezoneNext(tz);
  });
}

export default Ember.Component.extend({
  classNames: ['timezone-container'],

  users: null,

  offsets: Ember.computed.mapBy('users', 'tzOffset'),
  earliest: Ember.computed.min('offsets'),
  latest: Ember.computed.max('offsets'),

  columns: Ember.computed('users.@each', 'earliest', 'latest', function() {
    let users = this.get('users');
    let start = timezoneStart(this.get('earliest'));
    let stop = timezoneNext(timezoneStart(this.get('latest')));
    let columns = Ember.A();

    for (let tz = start; tz < stop; tz = timezoneNext(tz)) {
      columns.push(Ember.Object.create({
        timezoneStart: tz,
        users: usersInTimezone(users, tz)
      }));
    }

    return columns;
  }).readOnly()
});
