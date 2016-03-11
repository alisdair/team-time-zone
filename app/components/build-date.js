import Ember from 'ember';
import config from '../config/environment';

const { Component } = Ember;

export default Component.extend({
  buildDate: moment(config.APP.buildDate).format('MMMM Do YYYY, HH:mm:ss Z'),
  version: config.APP.version
});
