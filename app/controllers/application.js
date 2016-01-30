import Ember from 'ember';

export default Ember.Controller.extend({
  navExpanded: false,

  actions: {
    toggleNavbar() {
      this.toggleProperty('navExpanded');
    },

    logout() {
      this.get('session').close().then(() => {
        this.transitionToRoute('about');
      });
    }
  }
});
