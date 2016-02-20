/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    'revision-data': {
      type: 'version-commit'
    },
    'ssh-index': {
      username: process.env.DEPLOY_USERNAME,
      host: process.env.DEPLOY_HOST,
      remoteDir: process.env.DEPLOY_DIR,
      privateKeyFile: process.env.DEPLOY_KEY,
      allowOverwrite: true
    },
    rsync: {
      dest: process.env.DEPLOY_DIR,
      username: process.env.DEPLOY_USERNAME,
      host: process.env.DEPLOY_HOST,
      delete: false
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
