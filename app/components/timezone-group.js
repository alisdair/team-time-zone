import Ember from 'ember';

const { Component, computed, inject, run } = Ember;

export default Component.extend({
  classNames: ['timezone-group'],

  storage: inject.service(),

  users: [],
  timezoneOffset: 0,

  sort: ['realName'],
  sortedUsers: computed.sort('users', 'sort'),

  defaultTimeFormat: 'HH:mm',
  timeFormat: computed.or('storage.timeFormat', 'defaultTimeFormat'),

  updateLocalTime: function() {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return;
    }

    this.set('localTime', moment());

    if (!Ember.testing) {
      run.later(this, this.updateLocalTime, 1000);
    }
  }.on('init'),

  dateTime: computed('localTime', 'timezoneOffset', function() {
    let localTime = this.get('localTime');
    let offset = this.get('timezoneOffset') / 60;
    return localTime.utcOffset(offset);
  }).readOnly(),

  timezone: computed('dateTime', function() {
    return this.get('dateTime').format('Z');
  }).readOnly(),

  time: computed('dateTime', 'timeFormat', function() {
    return this.get('dateTime').format(this.get('timeFormat'));
  }).readOnly(),

  actions: {
    toggleTimeFormat() {
      let timeFormat = this.get('timeFormat');
      if (timeFormat === 'HH:mm') {
        this.set('storage.timeFormat', 'h:mma');
      } else {
        this.set('storage.timeFormat', 'HH:mm');
      }
    }
  }
});
