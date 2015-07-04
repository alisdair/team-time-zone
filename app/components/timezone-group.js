import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['timezone-group'],

  users: [],
  timezoneOffset: 0,

  timezone: Ember.computed('timezoneOffset', function() {
    let tz = this.get('timezoneOffset');
    let sign = tz < 0 ? '-' : '+';
    let offset = Math.abs(tz);
    let hours = Math.trunc(offset / 3600);
    let minutes = (offset % 3600) / 60;
    let pad = i => (`0${i}`).slice(-2);

    return `${sign}${pad(hours)}:${pad(minutes)}`;
  }).readOnly(),

  time: Ember.computed('timezoneOffset', function() {
    return '13:53';
  }).readOnly()
});

