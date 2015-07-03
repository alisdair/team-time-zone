import ProtectedRoute from './protected';

export default ProtectedRoute.extend({
  model() {
    return this.store.findAll('user');
  }
});
