import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Pretender from 'pretender';

const { run } = Ember;

moduleFor('adapter:slack', 'Unit | Adapter | slack');

const JSON_HEADERS = { 'Content-Type': 'application/json' };

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
  assert.expect(2);

  let adapter = this.subject();

  let body = JSON.stringify({ ok: true, user: 'stub' });

  new Pretender(function() {
    this.get('/url', function(request) {
      assert.equal(request.queryParams.data, 'here', 'sends request data');
      return [200, JSON_HEADERS, body];
    });
  });

  run(function() {
    let result = adapter.ajax('/url', 'GET', { data: 'here' });

    result.then(function(response) {
      let json = JSON.parse(body);
      assert.deepEqual(response, json, 'should resolve with body');
    }, function() {
      assert.ok(false, 'should not reject promise');
    });
  });
});

test('ajax with successful response but { ok: false }', function(assert) {
  assert.expect(1);
  let adapter = this.subject();

  let body = JSON.stringify({ ok: false, error: 'whatever' });

  new Pretender(function() {
    this.get('/url', function() {
      return [200, JSON_HEADERS, body];
    });
  });

  run(function() {
    let result = adapter.ajax('/url', 'GET');

    result.then(function() {
      assert.ok(false, 'should not resolve promise');
    }, function(error) {
      let json = JSON.parse(body);
      assert.deepEqual(error, json, 'should reject with body');
    });
  });
});

test('ajax with error response', function(assert) {
  assert.expect(1);
  let adapter = this.subject();

  let body = JSON.stringify({ message: 'whatever' });

  new Pretender(function() {
    this.get('/url', function() {
      return [500, JSON_HEADERS, body];
    });
  });

  run(function() {
    let result = adapter.ajax('/url', 'GET');

    result.then(function() {
      assert.ok(false, 'should not resolve promise');
    }, function(error) {
      let json = error.responseJSON;
      assert.equal(json.message, 'whatever', 'should reject with error');
    });
  });
});
