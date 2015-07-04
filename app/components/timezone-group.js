import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['timezone-group'],

  users: [],
  timezoneOffset: 0,

  localtime: Ember.computed('timezoneOffset', function() {
    let offset = this.get('timezoneOffset') / 60;
    return moment().utcOffset(offset);
  }).readOnly(),

  timezone: Ember.computed('localtime', function() {
    return this.get('localtime').format('Z');
  }).readOnly(),

  time: Ember.computed('localtime', function() {
    return this.get('localtime').format('HH:mm');
  }).readOnly()
});

