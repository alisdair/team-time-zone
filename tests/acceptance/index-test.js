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
    assert.equal(currentURL(), '/');

    assert.equal(find('.user-profile').length, 0, 'shows no users');

    assert.equal(find('.cta').text().trim(), 'No users found.',
                 'shows message that no users are found');
  });
});

skip('shows a list of users grouped by timezone', function(assert) {
});

skip('distant timezones have more space between them', function(assert) {
});

skip('can search for users by name', function(assert) {
});
