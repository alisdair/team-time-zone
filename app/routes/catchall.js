import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  renderTemplate() {
    this.render('error');
  }
});
