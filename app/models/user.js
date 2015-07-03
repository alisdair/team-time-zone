import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  deleted: DS.attr('boolean'),

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  realName: DS.attr('string'),

  tz: DS.attr('string'),
  tzLabel: DS.attr('string'),
  tzOffset: DS.attr('number'),

  timezone: Ember.computed('tzOffset', function() {
    let tz = this.get('tzOffset');
    let sign = tz < 0 ? '-' : '+';
    let offset = Math.abs(tz);
    let hours = Math.trunc(offset / 3600);
    let minutes = (offset % 3600) / 60;
    let pad = i => (`0${i}`).slice(-2);

    return `${sign}${pad(hours)}:${pad(minutes)}`;
  }),

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  image_24: DS.attr('string'),
  image_32: DS.attr('string'),
  image_48: DS.attr('string'),
  image_72: DS.attr('string'),
  image_192: DS.attr('string')
  // jscs:enable
});
