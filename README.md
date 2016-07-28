# Team Time Zone

[![Build Status](https://travis-ci.org/alisdair/team-time-zone.svg)](https://travis-ci.org/alisdair/team-time-zone)

![Team Time Zone](http://i.imgur.com/zl2xQIA.png)

This app helps you work out what time it is for everyone on your team. Just sign in with Slack to sync up your team, and see what time it is for all your coworkers.

See also the [team-time-zone-backend](https://github.com/alisdair/team-time-zone-backend) repository, which provides the last step of authentication.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

Development mode uses a [Mirage server](http://www.ember-cli-mirage.com/) to provide some sample data.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deployment

Copy `.env.deploy.sample` to `.env.deploy.production` and set up your server configuration. Then use ember-cli-deploy:

* `ember deploy --activate production`
* `ember deploy:list production`
