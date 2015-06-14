import Ember from 'ember';
import TimezoneColumn from 'stz/models/timezone-column';

const secondsInHour = 3600;

// FIXME: all these functions should be in utils so that they're testable

function calculateTimezoneStart(offset) {
  // Finds the start of the hour window for the timezone containing offset.
  // 7200 -> 7200
  // 9000 -> 7200
  // -7200 -> -7200
  // -9000 -> -10800
  return Math.floor(offset / secondsInHour) * secondsInHour;
}

function calculateTimezoneStop(offset) {
  // Finds the end of the hour window for the timezone containing offset.
  // 7200 -> 7200
  // 9000 -> 10800
  // -7200 -> -7200
  // -9000 -> -7200
  return Math.ceil(offset / secondsInHour) * secondsInHour;
}

function nextTimezone(start) {
  return start + secondsInHour;
}

export default Ember.Component.extend({
  classNames: ['timezone-container'],

  users: Ember.computed.alias('model'),
  offsets: Ember.computed.mapBy('users', 'tzOffset'),
  earliest: Ember.computed.min('offsets'),
  latest: Ember.computed.max('offsets'),

  columns: Ember.computed('users.@each.tzOffset', function() {
    let users = this.get('model');
    let start = calculateTimezoneStart(this.get('earliest'));
    let stop = calculateTimezoneStop(this.get('latest'));
    let columns = Ember.A();

    for (let tz = start; tz < stop; tz = nextTimezone(tz)) {
      let matches = users.filter(function(user) {
        let offset = user.get('tzOffset');
        return offset >= tz && offset < nextTimezone(tz);
      });
      columns.push(TimezoneColumn.create({
        timezoneStart: tz,
        users: matches
      }));
    }

    return columns;
  })
});
