import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize(jqXHR, requestOptions) {
    let accessToken = this.get('session.secure.accessToken');

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      let { url } = requestOptions;

      // FIXME: extract this to a unit-testable util function
      let sep = (url.indexOf('?') === -1) ? '?' : '&';
      url += `${sep}token=${accessToken}`;
      requestOptions.url = url;
    }
  }
});
