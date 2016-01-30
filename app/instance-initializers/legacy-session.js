import Ember from 'ember';
import LocalStorage from 'ttz/utils/local-storage';

function ignoreIfNone(data) {
  let result = {};

  for (let attr in data) {
    if (!Ember.isNone(data[attr])) {
      result[attr] = data[attr];
    }
  }

  return result;
}

function convertSession(data) {
  let { secure, timeFormat, userFilter } = data;
  let token = secure && secure.accessToken;

  return ignoreIfNone({ token, timeFormat, userFilter });
}

export function initialize(instance) {
  let storage = instance.container.lookup('service:storage');
  let legacy = new LocalStorage('ember_simple_auth:session');

  storage.setProperties(convertSession(legacy.data));
  legacy.delete();
}

export default {
  name: 'legacy-session',
  initialize
};
