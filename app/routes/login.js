import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import { randomUrlSafe } from 'ttz/utils/random';
import users from 'ttz/data/sample-users';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  setupController(controller) {
    controller.set('sampleUsers', users);
  },

  actions: {
    login() {
      let session = this.get('session');
      let state = randomUrlSafe(32);
      session.set('state', state);
      session.authenticate('authenticator:slack-torii', state);
    }
  }
});
