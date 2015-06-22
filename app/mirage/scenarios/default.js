import timezones from 'stz/data/slack-timezones';

export default function(server) {
  [
    {
      name: 'daniel',
      real_name: 'Daniel McCallum',
      tz: 'Europe/London',
      tz_label: 'Dublin, Edinburgh, Lisbon, London',
      tz_offset: 0,
      profile: {
        first_name: 'Daniel',
        last_name: 'McCallum',
        real_name: 'Daniel McCallum'
      }
    },
    {
      name: 'anita',
      real_name: 'Anita Singh',
      tz: 'Europe/London',
      tz_label: 'Dublin, Edinburgh, Lisbon, London',
      tz_offset: 0,
      profile: {
        first_name: 'Anita',
        last_name: 'Singh',
        real_name: 'Anita Singh'
      }
    },
    {
      name: 'floflo',
      real_name: 'Flo Bouvait',
      tz: 'Europe/Brussels',
      tz_label: 'Brussels, Copenhagen, Madrid, Paris',
      tz_offset: 3600,
      profile: {
        first_name: 'Florence',
        last_name: 'Bouvait',
        real_name: 'Flo Bouvait'
      }
    },
    {
      name: 'marcus',
      real_name: 'Marcus J',
      tz: 'America/New_York',
      tz_label: 'Eastern Time (US and Canada)',
      tz_offset: -18000,
      profile: {
        first_name: null,
        last_name: null,
        real_name: 'Marcus J'
      }
    },
    {
      name: 'dc',
      real_name: 'David Campbell',
      tz: 'America/Jamaica',
      tz_label: 'Kingston, George Town',
      tz_offset: -18000,
      profile: {
        first_name: 'David',
        last_name: 'Campbell',
        real_name: 'David Campbell'
      }
    },
    {
      name: 'xwang',
      real_name: 'Wang Xiaoli',
      tz: 'Asia/Chongqing',
      tz_label: 'Beijing, Chongqing, Hong Kong SAR, Urumqi',
      tz_offset: 28800,
      profile: {
        first_name: 'Xiaoli',
        last_name: 'Wang',
        real_name: 'Wang Xiaoli'
      }
    },
    {
      name: 'chong',
      real_name: 'Chong Shen',
      tz: 'Asia/Chongqing',
      tz_label: 'Beijing, Chongqing, Hong Kong SAR, Urumqi',
      tz_offset: 28800,
      profile: {
        first_name: 'Shen',
        last_name: 'Chong',
        real_name: 'Chong Shen'
      }
    },
    {
      name: 'lukasz',
      real_name: 'Łukasz Szczęsny',
      tz: 'Europe/Warsaw',
      tz_label: 'Sarajevo, Skopje, Warsaw, Zagreb',
      tz_offset: 3600,
      profile: {
        first_name: 'Lukasz',
        last_name: 'Szczesny',
        real_name: 'Łukasz Szczęsny'
      }
    },
    {
      name: 'sdc',
      real_name: 'SD Carter',
      tz: 'Asia/Chongqing',
      tz_label: 'Beijing, Chongqing, Hong Kong SAR, Urumqi',
      tz_offset: 28800,
      profile: {
        first_name: 'SD',
        last_name: 'Carter',
        real_name: 'SD Carter'
      }
    },
    {
      name: 'yi',
      real_name: 'Yi Ling Tan',
      tz: 'Asia/Kuala_Lumpur',
      tz_label: 'Kuala Lumpur, Singapore',
      tz_offset: 28800,
      profile: {
        first_name: 'Yi Ling',
        last_name: 'Tan',
        real_name: 'Yi Ling Tan'
      }
    },
    {
      name: 'maddie',
      real_name: 'Maddie Palmer',
      tz: 'Europe/London',
      tz_label: 'Dublin, Edinburgh, Lisbon, London',
      tz_offset: 0,
      profile: {
        first_name: 'Maddie',
        last_name: 'Palmer',
        real_name: 'Maddie Palmer'
      }
    },
    {
      name: 'georg',
      real_name: 'Georg Schumann',
      tz: 'America/Los_Angeles',
      tz_label: 'Pacific Time (US and Canada)',
      tz_offset: -28800,
      profile: {
        first_name: 'Georg',
        last_name: 'Schumann',
        real_name: 'Georg Schumann'
      }
    }
  ].forEach(attrs => server.create('user', attrs));
}
