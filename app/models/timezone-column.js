import Ember from 'ember';

export default Ember.Object.extend({
  timezoneStart: null,
  users: null,
  empty: Ember.computed.empty('users')
});
