import ProtectedRoute from './protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.store.find('user');
  }
});
