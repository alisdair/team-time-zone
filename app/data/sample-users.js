import Ember from 'ember';

let users = [
  {
    name: 'marcus',
    realName: 'Marcus J',
    image192: 'http://slack.global.ssl.fastly.net/3654/img/avatars/ava_0002.png',
    tzOffset: -25200
  },
  {
    name: 'dc',
    realName: 'David Campbell',
    image192: 'http://slack.global.ssl.fastly.net/3654/img/avatars/ava_0003.png',
    tzOffset: -10800
  },
  {
    name: 'lukaszszczesny',
    realName: 'Łukasz Szczęsny',
    image192: 'http://slack.global.ssl.fastly.net/3654/img/avatars/ava_0006.png',
    tzOffset: 7200
  },
  {
    name: 'yi',
    realName: 'Yi Ling Tan',
    image192: 'http://slack.global.ssl.fastly.net/3654/img/avatars/ava_0008.png',
    tzOffset: 32400
  },
  {
    name: 'maddie',
    realName: 'Maddie Palmer',
    image192: 'http://slack.global.ssl.fastly.net/3654/img/avatars/ava_0009.png',
    tzOffset: 3600
  }
];

export default users.map(attributes => Ember.Object.create(attributes));
