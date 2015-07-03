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
    return this.get('tzOffset') / 3600;
  }),

  image_72: DS.attr() // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
});
