import Ember from 'ember';
import DS from 'ember-data';

let get = Ember.get;

export default DS.Adapter.extend({
  host: null,
  namespace: 'slack',
  defaultSerializer: 'slack',

  find(store, type, id) {
    let url = this.buildURL(type.modelName, '.info');
    let data = {};
    data[type.modelName] = id;

    return this.ajax(url, 'GET', data);
  },

  findAll(store, type) {
    let url = this.buildURL(type.modelName, '.list');

    return this.ajax(url, 'GET');
  },

  buildURL(modelName, suffix) {
    let url = [];
    let namespace = get(this, 'namespace');
    let host = get(this, 'host');

    if (host) {
      url.push(host);
    }
    if (namespace) {
      url.push(namespace);
    }

    url.push(this.prefixForType(modelName) + suffix);

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = `/${url}`;
    }

    return url;
  },

  prefixForType(modelName) {
    return Ember.String.pluralize(modelName);
  },

  ajax(url, type, data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let hash = {
        url, type, data,
        dataType: 'json',
        context: this
      };

      hash.success = function(json) {
        if (json.ok === true) {
          Ember.run(null, resolve, json);
        } else {
          Ember.run(null, reject, json);
        }
      };

      hash.error = function(jqXHR) {
        jqXHR.then = null; // jQuery promises are dumb
        Ember.run(null, reject, jqXHR);
      };

      Ember.$.ajax(hash);
    }, `DS: SlackAdapter#ajax ${type} to ${url}`);
  }
});
