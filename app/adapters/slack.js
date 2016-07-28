import Environment from 'ttz/config/environment';
import Ember from 'ember';
import Adapter from 'ember-data/adapter';
import appendUrlParams from 'ttz/utils/append-url-params';

const { RSVP, get, inject, run, isEmpty } = Ember;
const { pluralize } = Ember.String;

export default Adapter.extend({
  host: Environment.APP.slackHost,
  namespace: Environment.APP.slackNamespace,
  defaultSerializer: 'slack',

  session: inject.service(),

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

    return this._authorizeUrl(url);
  },

  prefixForType(modelName) {
    return pluralize(modelName);
  },

  ajax(url, type, data) {
    return new RSVP.Promise(function(resolve, reject) {
      let hash = {
        url,
        type,
        data,
        dataType: 'json',
        context: this
      };

      hash.success = function(json) {
        if (json.ok === true) {
          run(null, resolve, json);
        } else {
          run(null, reject, json);
        }
      };

      hash.error = function(jqXHR) {
        jqXHR.then = null; // jQuery promises are dumb
        run(null, reject, jqXHR);
      };

      Ember.$.ajax(hash);
    }, `DS: SlackAdapter#ajax ${type} to ${url}`);
  },

  _authorizeUrl(url) {
    let token = this.get('session.token');

    if (isEmpty(token)) {
      return url;
    }

    return appendUrlParams(url, { token });
  }
});
