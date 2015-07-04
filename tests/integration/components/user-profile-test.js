import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('user-profile', 'Integration - Component - User Profile', {
  integration: true
});

test('displays the user profile', function(assert) {
  let user = Ember.Object.create({
    name: 'crazyeyes',
    realName: 'Suzanne Warren',
    image192: 'http://placehold.it/192x192'
  });

  this.set('user', user);

  this.render(hbs`
    {{user-profile user=user}}
  `);

  let $profile = this.$('.user-profile');

  let $avatar = $profile.find('.user-profile__avatar img');
  assert.equal($avatar.prop('src'), user.get('image192'),
               'loads the user avatar image');

  let $username = $profile.find('.user-profile__username');
  assert.equal($username.text().trim(), 'crazyeyes',
              'displays username');

  let $realname = $profile.find('.user-profile__realname');
  assert.equal($realname.text().trim(), 'Suzanne Warren',
              'displays real name');
});
