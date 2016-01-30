import Ember from 'ember';

export default Ember.Object.extend({
  storage: Ember.inject.service(),

  fetch() {
    let token = this.get('storage.token');

    if (Ember.isEmpty(token)) {
      throw new Error('No token in storage');
    }

    return Ember.RSVP.resolve({ token });
  },

  open(authentication) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        url: '/api/tokens',
        data: authentication,
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        failure: Ember.run.bind(null, reject)
      });
    }).then(data => {
      let token = data.accessToken;

      this.set('storage.token', token);

      return { token };
    });
  },

  close() {
    this.set('storage.token', null);

    return Ember.RSVP.resolve();
  }
});
