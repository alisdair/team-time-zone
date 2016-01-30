import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      replace: true
    }
  },

  model() {
    return this.store.findAll('user');
  },

  renderTemplate() {
    this.render('search', { outlet: 'navbar' });
    this.render('index');
  }
});
