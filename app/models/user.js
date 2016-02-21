import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),

  deleted: attr('boolean'),
  isBot: attr('boolean'),
  isRestricted: attr('boolean'),
  isUltraRestricted: attr('boolean'),

  firstName: attr('string'),
  lastName: attr('string'),
  realName: attr('string'),

  tz: attr('string'),
  tzLabel: attr('string'),
  tzOffset: attr('number'),

  image24: attr('string'),
  image32: attr('string'),
  image48: attr('string'),
  image72: attr('string'),
  image192: attr('string')
});
