import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],

  storage: Ember.inject.service(),

  search: '',

  users: Ember.computed('model.[]', function() {
    return this.get('model').filter(user => {
      return !(user.get('deleted') ||
               user.get('isBot') ||
               user.get('id') === 'USLACKBOT');
    });
  }),

  userFilter: Ember.computed.alias('storage.userFilter'),

  tooManyUsers: Ember.computed.gt('filteredUsers.length', 250),

  filteredUsers: Ember.computed('search', 'userFilter', 'users.{name,realName}', function() {
    let users = this.get('users');
    let search = this.get('search').toLowerCase();
    let userType = this.get('userFilter');

    if (userType === 'full') {
      users = users.filter(user => {
        return user.get('isRestricted') === false;
      });
    } else if (userType === 'restricted') {
      users = users.filter(user => {
        return user.get('isRestricted') === true;
      });
    }

    if (Ember.isNone(users) || Ember.isBlank(search)) {
      return users;
    }

    let matches = string => string.toLowerCase().indexOf(search) > -1;
    return users.filter(user => {
      return matches(user.get('name')) || matches(user.get('realName'));
    });
  }).readOnly(),

  actions: {
    filterUserTypes(userType) {
      this.set('userFilter', userType);
    }
  }
});
