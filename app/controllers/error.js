import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  message: computed.or('model.message', 'model.statusText', 'model')
});
