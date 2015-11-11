import Oauth2 from 'torii/providers/oauth2-code';

export default Oauth2.extend({
  name:       'slack-oauth2',
  baseUrl:    'https://slack.com/oauth/authorize',

  responseParams: ['code', 'state']
});
