import Ember from 'ember';
import LocalStorage from 'ttz/utils/local-storage';

const { Service, computed } = Ember;

export default Service.extend({
  token: attr(),
  timeFormat: attr(),
  userFilter: attr()
});

function attr() {
  return computed({
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
