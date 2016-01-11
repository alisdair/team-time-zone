import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  deleted: DS.attr('boolean'),
  isBot: DS.attr('boolean'),
  isRestricted: DS.attr('boolean'),
  isUltraRestricted: DS.attr('boolean'),

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  realName: DS.attr('string'),

  tz: DS.attr('string'),
  tzLabel: DS.attr('string'),
  tzOffset: DS.attr('number'),

  image24: DS.attr('string'),
  image32: DS.attr('string'),
  image48: DS.attr('string'),
  image72: DS.attr('string'),
  image192: DS.attr('string')
});
