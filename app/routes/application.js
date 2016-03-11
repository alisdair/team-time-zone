import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
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
