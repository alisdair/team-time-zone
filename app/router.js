import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('index', { path: '/' });
  this.route('login');
  this.route('authorize');
  this.route('about');
  this.route('catchall', { path: '/*wildcard' });
});

export default Router;
