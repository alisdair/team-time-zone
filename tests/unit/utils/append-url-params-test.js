import { module, test } from 'qunit';
import appendUrlParams from 'ttz/utils/append-url-params';

module('Unit | Util | appendUrlParams');

test('appending empty params does nothing', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever';
  assert.equal(appendUrlParams(url, {}), url,
               'appending no params does not change the URL');
});

test('appending one param to URL without query', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever';
  assert.equal(appendUrlParams(url, { test: 'value' }), `${url}?test=value`,
               'adds query string to URL if none exists');
});

test('appending one param to URL with existing query', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever?ok=true';
  assert.equal(appendUrlParams(url, { test: 'value' }), `${url}&test=value`,
               'extends existing query string with param');
});

test('appending two params to URL without query', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever';
  let params = { test: 'value', other: 12345 };
  assert.equal(appendUrlParams(url, params), `${url}?other=12345&test=value`,
               'adds query string with params in sorted order');
});

test('appending two params to URL with existing query', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever?ok=true';
  let params = { test: 'value', other: 12345 };
  assert.equal(appendUrlParams(url, params), `${url}&other=12345&test=value`,
               'extends existing query string with params in sorted order');
});

test('appending params with non-URL safe characters', function(assert) {
  assert.expect(1);

  let url = 'http://www.example.com/whatever';
  let params = { email: 'test@example.com', 'best pub?': 'Owl & Fox' };
  assert.equal(appendUrlParams(url, params),
               `${url}?best%20pub%3F=Owl%20%26%20Fox&email=test%40example.com`,
               'param names and values are URL encoded');
});
