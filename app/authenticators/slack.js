import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import config from 'ttz/config/environment';

export default Base.extend({
  torii: null,

  restore(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate(state) {
    if (config.environment !== 'production') {
      return Ember.RSVP.resolve({
        accessToken: 'token',
        scope: 'identify,users:read'
      });
    }

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
