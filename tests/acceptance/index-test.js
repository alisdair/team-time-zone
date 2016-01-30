import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ttz/tests/helpers/start-app';
import { stubValidSession } from 'ttz/tests/helpers/torii';

let application;

module('Acceptance | Index', {
  beforeEach() {
    application = startApp();
    stubValidSession(application, { token: 'token' });
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('with no users, shows message', function(assert) {
  assert.expect(3);

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

  let tzOffsets = [-25200, -25200, 3600, 7200, 7200];
  tzOffsets.map(tzo => server.create('user', { 'tz_offset': tzo }));

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

test('distant timezones have more space between them', function(assert) {
  assert.expect(4);

  server.create('user', { name: 'seattle', 'tz_offset': -25200 });
  server.create('user', { name: 'london', 'tz_offset': 3600 });
  server.create('user', { name: 'madrid', 'tz_offset': 7200 });

  let position = $el => Math.round($el.offset().left);

  visit('/');

  andThen(function() {
    assert.equal(find('.user-profile').length, 3, 'shows 3 users');

    let $seattle = find('.user-profile:contains(seattle)');
    let $london = find('.user-profile:contains(london)');
    let $madrid = find('.user-profile:contains(madrid)');

    let positions = {
      seattle: position($seattle),
      london: position($london),
      madrid: position($madrid)
    };

    assert.ok(positions.seattle < positions.london,
              `Seattle (${positions.seattle}) is to the left of
               London (${positions.london})`);

    assert.ok(positions.london < positions.madrid,
              `London (${positions.london}) is to the left of
               Madrid (${positions.madrid})`);

    let atlantic = positions.london - positions.seattle;
    let channel = positions.madrid - positions.london;

    assert.ok(atlantic > channel * 2,
              `Atlantic gap (${atlantic}) is more than twice the
               Channel gap (${channel})`);
  });
});

test('can search for users by name', function(assert) {
  assert.expect(12);

  server.create('user', {
    'name': 'alexa',
    'real_name': 'Alexa Gamblin',
    'profile': {
      'real_name': 'Alexa Gamblin'
    }
  });
  server.create('user', {
    'name': 'david',
    'real_name': 'David Gambon',
    'profile': {
      'real_name': 'David Gambon'
    }
  });
  server.create('user', {
    'name': 'diaz',
    'real_name': 'Dayanara Diaz',
    'profile': {
      'real_name': 'Dayanara Diaz'
    }
  });

  visit('/');

  andThen(function() {
    assert.equal(find('.user-profile').length, 3, 'shows 3 users');
  });

  fillIn('.input--search', 'Gam').then(() => {
    assert.equal(find('.user-profile').length, 2,
                 'searching for "Gam" shows 2 users');
    assert.equal(find('.user-profile__username:contains(david)').length, 1,
                 'shows David Gambon');
    assert.equal(find('.user-profile__username:contains(alexa)').length, 1,
                 'shows Alexa Gamblin');
  });

  fillIn('.input--search', 'Da').then(() => {
    assert.equal(find('.user-profile').length, 2,
                 'searching for "Da" shows 2 users');
    assert.equal(find('.user-profile__username:contains(david)').length, 1,
                 'shows David Gambon');
    assert.equal(find('.user-profile__username:contains(diaz)').length, 1,
                 'shows Dayanara Diaz');
  });

  fillIn('.input--search', 'David').then(() => {
    assert.equal(find('.user-profile').length, 1,
                 'searching for "David" shows 1 user');
    assert.equal(find('.user-profile__username:contains(david)').length, 1,
                 'shows David Gambon');
  });

  fillIn('.input--search', 'Potato').then(() => {
    assert.equal(find('.user-profile').length, 0,
                 'searching for "Potato" shows no users');
    assert.equal(find('.cta').text().trim(), 'No users found.',
                 'shows message that no users are found');
  });

  fillIn('.input--search', '').then(() => {
    assert.equal(find('.user-profile').length, 3,
                 'clearing the search shows all 3 users');
  });
});
