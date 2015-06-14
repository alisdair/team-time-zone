import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['timezone-column'],
  classNameBindings: ['isEmpty:timezone-column--empty'],

  isEmpty: Ember.computed.empty('column.users')
});
