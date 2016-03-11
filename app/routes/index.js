import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
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
