import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';
import appendUrlParams from 'ttz/utils/append-url-params';

export default Base.extend({
  authorize(jqXHR, requestOptions) {
    let accessToken = this.get('session.secure.accessToken');

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      let params = { token: accessToken };
      requestOptions.url = appendUrlParams(requestOptions.url, params);
    }
  }
});
