import Ember from 'ember';

export default Ember.Service.extend({
  token: attr(),
  timeFormat: attr(),
  userFilter: attr()
});

function attr() {
  return Ember.computed({
    get(key) {
      return loadSession()[key];
    },

    set(key, value) {
      let session = loadSession();

      session[key] = value;
      storeSession(session);

      return value;
    }
  });
}

const STORAGE_KEY = 'session';

function loadSession() {
  let data = window.localStorage.getItem(STORAGE_KEY);

  try {
    return JSON.parse(data) || {};
  } catch (e) {
    Ember.logger.error(`Invalid JSON session data: "${data}" (error: ${e})`);
    return {};
  }
}

function storeSession(session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
