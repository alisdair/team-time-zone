import Ember from 'ember';
import { module, test, skip } from 'qunit';
import startApp from 'ttz/tests/helpers/start-app';

let application;

module('Acceptance | Index', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('with no users, shows message', function(assert) {
  assert.expect(3);

  authenticateSession();

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/', 'shows index page');

    assert.equal(find('.user-profile').length, 0, 'shows no users');

    assert.equal(find('.cta').text().trim(), 'No users found.',
                 'shows message that no users are found');
  });
});

test('shows a list of users grouped by timezone', function(assert) {
  assert.expect(4);

  authenticateSession();

  let tzOffsets = [-25200, -25200, 3600, 7200, 7200];
  let users = tzOffsets.map(tzo => server.create('user', { 'tz_offset': tzo }));

  visit('/');

  andThen(function() {
    assert.equal(find('.user-profile').length, 5, 'shows 5 user profiles');

    assert.equal(find('.timezone-group').length, 3,
                 'users grouped into 3 timezones');

    assert.equal(find('.timezone-column').length, 10,
                 'shows 11 total timezone columns');

    assert.equal(find('.timezone-column--empty').length, 7,
                 '8 of the timezone columns are empty');
  });
});

skip('distant timezones have more space between them', function(assert) {
});

skip('can search for users by name', function(assert) {
});
