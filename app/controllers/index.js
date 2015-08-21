import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],

  search: '',

  users: Ember.computed('model.@each', function() {
    return this.get('model').filter(user => {
      return !(user.get('deleted') || user.get('isBot'));
    });
  }),

  tooManyUsers: Ember.computed.gt('filteredUsers.length', 250),

  filteredUsers: Ember.computed('search', 'users.{name,realName}', function() {
    let users = this.get('users');
    let search = this.get('search').toLowerCase();

    if (Ember.isNone(users) || Ember.isBlank(search)) {
      return users;
    }

    let matches = string => string.toLowerCase().indexOf(search) > -1;
    return users.filter(user => {
      return matches(user.get('name')) || matches(user.get('realName'));
    });
  }).readOnly()
});
