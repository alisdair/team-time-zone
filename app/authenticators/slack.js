import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  torii: null,

  restore(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate(state) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.torii.open('slack-oauth2', state).then(data => {
        return Ember.$.ajax({
          type: 'POST',
          url: '/api/tokens',
          data,
          dataType: 'json'
        });
      }).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }
});
