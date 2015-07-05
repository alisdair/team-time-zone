import Mirage from 'ember-cli-mirage';

const avatarBase = 'http://slack.global.ssl.fastly.net/3654/img/avatars';

function avatar(i, size) {
  let x = (`000${i % 25}`).slice(-4);
  let suffix = size === 192 ? '' : `-${size}`;
  return `${avatarBase}/ava_${x}${suffix}.png`;
}

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
export default Mirage.Factory.extend({
  id: i => `U${2000 + i}BEGCF`,
  name: i => `user-${i}`,
  deleted: false,
  status: null,
  color: '9f69e7',
  real_name: i => `User-${i} Lastname`,
  tz: 'Europe/London',
  tz_label: 'London',
  tz_offset: 0,
  profile(i) {
    let first_name = `User-${i}`;
    return {
      first_name,
      last_name: 'Lastname',
      real_name: `${first_name} Lastname`,
      real_name_normalized: `${first_name} Lastname`,
      title: 'Cool Person',
      email: `user-${i}@example.com`,
      image_24: avatar(i, 24),
      image_32: avatar(i, 32),
      image_48: avatar(i, 48),
      image_72: avatar(i, 72),
      image_192: avatar(i, 192)
    };
  },
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  has_files: true,
  has_2fa: false
});
// jscs:enable
