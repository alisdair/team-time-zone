import Ember from 'ember';
import users from 'ttz/data/sample-users';

const { Route } = Ember;

export default Route.extend({
  setupController(controller) {
    controller.set('sampleUsers', users);
  },

  actions: {
    login() {
      this.get('session').open('slack-oauth2').then(() => {
        this.transitionTo('index');
      }, error => {
        this.controllerFor('login').set('error', error);
      });
    }
  }
});
