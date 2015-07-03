import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),

  deleted: DS.attr(),

  firstName: DS.attr(),
  lastName: DS.attr(),
  realName: DS.attr(),

  tz: DS.attr(),
  tzLabel: DS.attr(),
  tzOffset: DS.attr(),

  timezone: Ember.computed('tzOffset', function() {
    let tz = this.get('tzOffset');
    let sign = tz < 0 ? '-' : '+';
    let offset = Math.abs(tz);
    let hours = Math.trunc(offset / 3600);
    let minutes = (offset % 3600) / 60;
    let pad = i => (`0${i}`).slice(-2);

    return `${sign}${pad(hours)}:${pad(minutes)}`;
  }),

  image_72: DS.attr() // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
});
