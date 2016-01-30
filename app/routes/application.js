import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    accessDenied() {
      this.transitionTo('login');
    },

    error(error) {
      if (error.error === 'invalid_auth') {
        this.get('session').close().then(() => {
          this.transitionTo('about');
        });
      } else {
        this.transitionTo('catchall', 'application-error');
      }
    }
  }
});
