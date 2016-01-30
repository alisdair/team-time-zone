import Ember from 'ember';

export default class LocalStorage {
  constructor(item) {
    this.item = item;
    this.load();
  }

  load() {
    let data = window.localStorage.getItem(this.item);

    try {
      this.data = JSON.parse(data) || {};
    } catch (e) {
      Ember.logger.error(`Invalid JSON session data: "${data}" (error: ${e})`);
      this.data = {};
    }
  }

  store() {
    window.localStorage.setItem(this.item, JSON.stringify(this.data));
  }

  delete() {
    window.localStorage.removeItem(this.item);
  }
}
