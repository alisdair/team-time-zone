import Ember from 'ember';

let users = [
  {
    name: 'marcus',
    realName: 'Marcus J',
    image192: '/assets/avatars/marcus.jpg',
    tzOffset: -25200
  },
  {
    name: 'dc',
    realName: 'David Campbell',
    image192: '/assets/avatars/dc.jpg',
    tzOffset: -10800
  },
  {
    name: 'lukaszszczesny',
    realName: 'Łukasz Szczęsny',
    image192: '/assets/avatars/lukasz.jpg',
    tzOffset: 7200
  },
  {
    name: 'yi',
    realName: 'Yi Ling Tan',
    image192: '/assets/avatars/yi.jpg',
    tzOffset: 32400
  },
  {
    name: 'maddie',
    realName: 'Maddie Palmer',
    image192: '/assets/avatars/maddie.jpg',
    tzOffset: 3600
  }
];

export default users.map(attributes => Ember.Object.create(attributes));
