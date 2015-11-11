import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import users from 'ttz/data/sample-users';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  setupController(controller) {
    controller.set('sampleUsers', users);
  },

  actions: {
    login() {
      let session = this.get('session');
      session.authenticate('authenticator:slack-torii');
    }
  }
});
