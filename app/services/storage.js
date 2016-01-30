import Ember from 'ember';
import LocalStorage from 'ttz/utils/local-storage';

export default Ember.Service.extend({
  token: attr(),
  timeFormat: attr(),
  userFilter: attr()
});

function attr() {
  return Ember.computed({
    get(key) {
      return new LocalStorage(STORAGE_ITEM).data[key];
    },

    set(key, value) {
      let session = new LocalStorage(STORAGE_ITEM);

      session.data[key] = value;
      session.store();

      return value;
    }
  });
}

const STORAGE_ITEM = 'session';
