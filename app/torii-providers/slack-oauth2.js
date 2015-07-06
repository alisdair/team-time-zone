import Ember from 'ember';
import Oauth2 from 'torii/providers/oauth2-code';
import { configurable } from 'torii/configuration';

export default Oauth2.extend({
  name:       'slack-oauth2',
  baseUrl:    'https://slack.com/oauth/authorize',

  requiredUrlParams: ['state'],

  responseParams: ['code', 'state'],

  state: 'state',

  redirectUri: configurable('redirectUri', function() {
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open(state) {
    if (Ember.isEmpty(state)) {
      throw new Error('Authentication requires a unique session state');
    }

    this.set('state', state);

    let name = this.get('name');
    let url = this.buildUrl();
    let responseParams = this.get('responseParams');
    let redirectUri = this.get('redirectUri');

    return this.get('popup').open(url, responseParams).then(function(authData) {
      let missingResponseParams = [];

      responseParams.forEach(function(param) {
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length) {
        throw new Error(`The response from the provider is missing
              these required response params: ${responseParams.join(', ')}`);
      }

      if (authData.state !== state) {
        throw new Error(`The response from the provider has an
                        incorrect session state param: should be "${state}",
                        but is "${authData.state}"`);
      }

      return {
        authorizationCode: authData.code,
        provider: name,
        redirectUri
      };
    });
  }
});
