import ProtectedRoute from './protected';

export default ProtectedRoute.extend({
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
