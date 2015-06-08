import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  deleted: DS.attr(),
  realName: DS.attr(),
  tz: DS.attr(),
  tzLabel: DS.attr(),
  tzOffset: DS.attr()
});
