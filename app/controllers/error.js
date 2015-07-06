import Ember from 'ember';

export default Ember.Controller.extend({
  message: Ember.computed.or('model.message', 'model.statusText', 'model')
});
