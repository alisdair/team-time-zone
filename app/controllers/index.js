import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],

  search: '',

  users: Ember.computed.readOnly('model'),

  tooManyUsers: Ember.computed.gt('filteredUsers.length', 100),

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
