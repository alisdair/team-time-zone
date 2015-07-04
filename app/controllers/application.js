import Ember from 'ember';

export default Ember.Controller.extend({
  navExpanded: false,

  actions: {
    toggleNavbar() {
      this.toggleProperty('navExpanded');
    }
  }
});
