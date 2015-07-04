import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['timezone-column'],
  classNameBindings: ['isEmpty:timezone-column--empty'],

  users: [],
  isEmpty: Ember.computed.empty('users'),

  groups: Ember.computed('users.@each.tzOffset', function() {
    let groups = {};
    this.get('users').forEach(user => {
      let timezone = user.get('tzOffset');

      if (Ember.isNone(groups[timezone])) {
        groups[timezone] = Ember.Object.create({
          timezoneOffset: timezone,
          users: Ember.A()
        });
      }

      groups[timezone].users.push(user);
    });

    let results = Ember.A();
    Object.keys(groups).sort((a, b) => a - b).forEach(timezone => {
      results.push(groups[timezone]);
    });

    return results;
  })
});
