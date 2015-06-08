import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizePayload(payload) {
    this._super.apply(this, arguments);

    delete payload.ok;

    return payload;
  },

  modelNameFromPayloadKey: function(key) {
    if (key === 'members') {
      return 'user';
    }

    return this._super.apply(this, arguments);
  }
});
