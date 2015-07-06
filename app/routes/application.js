import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    error() {
      this.transitionTo('catchall', 'application-error');
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
