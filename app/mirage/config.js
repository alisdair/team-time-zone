import Ember from 'ember';

const { isNone } = Ember;

export default function() {
  this.namespace = '/mirage';

  this.get('/slack/users.list', function(db) {
    return { ok: true, members: db.users };
  });

  this.get('/slack/users.info', function(db, request) {
    let user = db.users.find(request.queryParams.user);
    if (isNone(user)) {
      return {
        ok: false,
        error: 'user_not_found'
      };
    }

    return {
      ok: true,
      user
    };
  });

  this.post('/api/tokens', function() {
    return {
      accessToken: 'token',
      scope: 'identify,read'
    };
  });
}
