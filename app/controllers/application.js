import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
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
