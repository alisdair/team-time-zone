import Ember from 'ember';

const { Controller, computed, inject, isBlank, isNone } = Ember;

export default Controller.extend({
  queryParams: ['search'],

  storage: inject.service(),

  search: '',

  users: computed('model.[]', function() {
    return this.get('model').filter(user => {
      return !(user.get('deleted') ||
               user.get('isBot') ||
               user.get('id') === 'USLACKBOT');
    });
  }),

  userFilter: computed.alias('storage.userFilter'),

  tooManyUsers: computed.gt('filteredUsers.length', 250),

  filteredUsers: computed('search', 'userFilter', 'users.{name,realName}', function() {
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

    if (isNone(users) || isBlank(search)) {
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
