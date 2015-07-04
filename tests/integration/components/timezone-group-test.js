import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

let originalMoment;
let currentTime;

function shallowText($element) {
  return $element.contents()
   .filter((i, e) => e.nodeType === window.Node.TEXT_NODE).text().trim();
}

function allTexts(selector, $element) {
  return $element.find(selector).map(function() {
    return $(this).text().trim();
  }).get();
}

function buildUsers(...names) {
  return Ember.A(names).map(name => {
    return Ember.Object.create({
      name: name.dasherize(),
      realName: name,
      image192: 'http://placehold.it/192x192'
    });
  });
}

moduleForComponent('timezone-group', 'Integration - Component - Timezone Group', {
  integration: true,

  beforeEach() {
    originalMoment = window.moment;
    window.moment = function() {
      return originalMoment(currentTime);
    };
  },

  afterEach() {
    window.moment = originalMoment;
  }
});

test('displays the time and timezone', function(assert) {
  assert.expect(2);

  currentTime = '2015-07-04 23:15:00 +0100';
  this.set('offset', -9000);
  this.set('users', []);

  this.render(hbs`
    {{timezone-group timezoneOffset=offset users=users}}
  `);

  let $group = this.$('.timezone-group');

  let $time = $group.find('.timezone-group__time');
  assert.equal(shallowText($time), '19:45', 'shows time adjusted for timezone');

  let $timezone = $group.find('.timezone-group__timezone');
  assert.equal($timezone.text().trim(), '-02:30', 'shows timezone offset');
});

test('lists the users for the timezone, sorted by name', function(assert) {
  assert.expect(2);

  currentTime = '2015-07-04 23:15:00 +0100';
  this.set('offset', 3600);

  let users = buildUsers('Sam Healy', 'Gloria Mendoza', 'Poussey Washington');
  this.set('users', users);

  this.render(hbs`
    {{timezone-group timezoneOffset=offset users=users}}
  `);

  let $group = this.$('.timezone-group');
  let $profiles = $group.find('.user-profile');

  assert.equal($profiles.length, 3, 'renders 3 profiles');

  let usernames = allTexts('.user-profile__realname', $profiles);
  assert.deepEqual(usernames,
                   ['Gloria Mendoza', 'Poussey Washington', 'Sam Healy'],
                   'sorts users by real name');
});
