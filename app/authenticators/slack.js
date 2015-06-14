import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate: function() {
    return Ember.RSVP.resolve({ access_token: 'test' });
  }
});
