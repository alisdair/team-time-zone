import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:slack', 'Unit | Adapter | slack');

let user = { modelName: 'user' };

test('prefixForType pluralizes the model name', function(assert) {
  assert.expect(1);

  let adapter = this.subject();
  assert.equal(adapter.prefixForType('user'), 'users', 'user prefix is users');
});

test('buildURL prepends slash if needed', function(assert) {
  assert.expect(1);

  let adapter = this.subject({
    host: null,
    namespace: null
  });
  let url;

  url = adapter.buildURL('file', '.list');
  assert.equal(url, '/files.list');
});

test('buildURL does not prepend slash if it is in namespace', function(assert) {
  assert.expect(1);

  let adapter = this.subject({
    host: null,
    namespace: '/slack'
  });
  let url;

  url = adapter.buildURL('file', '.list');
  assert.equal(url, '/slack/files.list');
});

test('buildURL joins host, namespace, prefix, suffix', function(assert) {
  assert.expect(2);

  let adapter = this.subject({
    host: 'https://api.slack.com',
    namespace: null
  });
  let url;

  url = adapter.buildURL('channel', '.list');
  assert.equal(url, 'https://api.slack.com/channels.list');

  url = adapter.buildURL('user', '.info');
  assert.equal(url, 'https://api.slack.com/users.info');
});

test('find with stubbed ajax method', function(assert) {
  assert.expect(3);

  let adapter = this.subject();
  adapter.ajax = function(url, type, data) {
    assert.equal(url, '/slack/users.info');
    assert.equal(type, 'GET');
    assert.deepEqual(data, { user: 5 });
  };

  adapter.find({}, user, 5);
});

test('findAll with stubbed ajax method', function(assert) {
  assert.expect(3);

  let adapter = this.subject();
  adapter.ajax = function(url, type, data) {
    assert.equal(url, '/slack/users.list');
    assert.equal(type, 'GET');
    assert.equal(data, undefined);
  };

  adapter.findAll({}, user);
});

test('ajax with successful response', function(assert) {
  assert.expect(7);
  let done = assert.async();

  let adapter = this.subject();

  let body = { ok: true, user: 'stub' };

  let originalAjax = Ember.$.ajax;
  Ember.$.ajax = function(hash) {
    assert.equal(hash.url, '/url', 'sets URL');
    assert.equal(hash.type, 'GET', 'sets request type');
    assert.deepEqual(hash.data, { data: 'here' }, 'sets request body');
    assert.equal(hash.dataType, 'json', 'sets request data type');
    assert.equal(typeof hash.success, 'function', 'success is a function');
    assert.equal(typeof hash.error, 'function', 'error is a function');

    hash.success(body);
  };

  try {
    Ember.run(function() {
      let result = adapter.ajax('/url', 'GET', { data: 'here' });

      result.then(function(response) {
        assert.deepEqual(response, body, 'should resolve with stubbed body');
        done();
      }, function() {
        assert.ok(false, 'should not reject promise');
        done();
      });
    });
  } finally {
    Ember.$.ajax = originalAjax;
  }
});

test('ajax with successful response but { ok: false }', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let adapter = this.subject();

  let body = { ok: false, error: 'whatever' };

  let originalAjax = Ember.$.ajax;
  Ember.$.ajax = function(hash) {
    hash.success(body);
  };

  try {
    Ember.run(function() {
      let result = adapter.ajax('/url', 'GET');

      result.then(function() {
        assert.ok(false, 'should not resolve promise');
        done();
      }, function(error) {
        assert.deepEqual(error, body, 'should reject with stubbed body');
        done();
      });
    });
  } finally {
    Ember.$.ajax = originalAjax;
  }
});

test('ajax with error response', function(assert) {
  assert.expect(2);
  let done = assert.async();

  let adapter = this.subject();

  let jqXHR = { then: x => x, message: 'whatever' };

  let originalAjax = Ember.$.ajax;
  Ember.$.ajax = function(hash) {
    hash.error(jqXHR);
  };

  try {
    Ember.run(function() {
      let result = adapter.ajax('/url', 'GET');

      result.then(function() {
        assert.ok(false, 'should not resolve promise');
        done();
      }, function(error) {
        assert.equal(error.message, 'whatever', 'should reject with error');
        assert.equal(error.then, null, 'removes the jqXHR then function');
        done();
      });
    });
  } finally {
    Ember.$.ajax = originalAjax;
  }
});
