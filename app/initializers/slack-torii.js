import Authenticator from 'ttz/authenticators/slack';

export default {
  name: 'slack-torii',
  before: 'simple-auth',
  after: 'torii',
  initialize(container, application) {
    let torii         = container.lookup('service:torii');
    let authenticator = Authenticator.create({ torii });
    application.register('authenticator:slack-torii', authenticator,
                         { instantiate: false });
  }
};
