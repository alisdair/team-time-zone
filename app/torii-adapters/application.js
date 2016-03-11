import Ember from 'ember';

const { RSVP, inject, isEmpty, run } = Ember;

export default Ember.Object.extend({
  storage: inject.service(),

  fetch() {
    let token = this.get('storage.token');

    if (isEmpty(token)) {
      throw new Error('No token in storage');
    }

    return RSVP.resolve({ token });
  },

  open(authentication) {
    return new RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        url: '/api/tokens',
        data: authentication,
        dataType: 'json',
        success: run.bind(null, resolve),
        failure: run.bind(null, reject)
      });
    }).then(data => {
      let token = data.accessToken;

      this.set('storage.token', token);

      return { token };
    });
  },

  close() {
    this.set('storage.token', null);

    return RSVP.resolve();
  }
});
