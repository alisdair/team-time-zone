import Ember from 'ember';
import TimezoneGroup from 'stz/models/timezone-group';

export default Ember.Component.extend({
  classNames: ['timezone-column'],
  classNameBindings: ['isEmpty:timezone-column--empty'],

  users: [],
  isEmpty: Ember.computed.empty('users'),

  groups: Ember.computed('users.@each.tzOffset', function() {
    let users = this.get('users');

    if (Ember.isNone(users)) {
      return Ember.A();
    }

    let groups = {};
    users.forEach(user => {
      let timezone = user.get('tzOffset');

      if (Ember.isNone(groups[timezone])) {
        groups[timezone] = TimezoneGroup.create({
          timezoneOffset: timezone,
          users: Ember.A()
        });
      }

      groups[timezone].users.push(user);
    });

    let results = Ember.A();
    Object.keys(groups).sort((a, b) => b - a).forEach(timezone => {
      results.push(groups[timezone]);
    });

    return results;
  })
});
