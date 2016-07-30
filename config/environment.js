/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ttz',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      slackHost: 'https://slack.com',
      slackNamespace: 'api'
    }
  };

  ENV['contentSecurityPolicy'] = {
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' slack.com",
    'img-src': "'self' *",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
    'media-src': "'self'"
  };

  ENV.torii = {
    sessionServiceName: 'session',
    providers: {
      'slack-oauth2': {
        scope: 'identify,users:read',
        apiKey: '2342810598.6063955397',
      }
    }
  };

  if (environment === 'development') {
    ENV.torii.providers['slack-oauth2'].apiKey = '2342810598.7294671267';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // ENV.APP.slackHost = null;
    // ENV.APP.slackNamespace = 'slack';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.APP.slackHost = null;
    ENV.APP.slackNamespace = 'mirage/slack';

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
