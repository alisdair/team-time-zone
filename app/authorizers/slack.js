import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR, requestOptions) {
    var accessToken = this.get('session.secure.access_token');

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      let url = requestOptions.url;
      let concat = (url.indexOf('?') === -1) ? '?' : '&'
      url += `${concat}token=${accessToken}`;
      requestOptions.url = url;
    }
  }
});
