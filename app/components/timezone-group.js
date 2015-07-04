import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['timezone-group'],

  users: [],
  timezoneOffset: 0,

  updateLocalTime: function() {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return;
    }

    this.set('localTime', moment());

    if (!Ember.testing) {
      Ember.run.later(this, this.updateLocalTime, 1000);
    }
  }.on('init'),

  dateTime: Ember.computed('localTime', 'timezoneOffset', function() {
    let localTime = this.get('localTime');
    let offset = this.get('timezoneOffset') / 60;
    return localTime.utcOffset(offset);
  }).readOnly(),

  timezone: Ember.computed('dateTime', function() {
    return this.get('dateTime').format('Z');
  }).readOnly(),

  time: Ember.computed('dateTime', function() {
    return this.get('dateTime').format('HH:mm');
  }).readOnly()
});
