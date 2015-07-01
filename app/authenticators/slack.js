import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate() {
    return Ember.RSVP.resolve({ accessToken: 'test' });
  }
});
