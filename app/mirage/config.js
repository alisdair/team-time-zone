import Ember from 'ember';

export default function() {
  this.get('/slack/users.list', function(db, request) {
    if (Ember.isNone(request.params.token)) {
      return { ok: false, error: 'not_authed' };
    }

    if (request.params.token === 'invalid') {
      return { ok: false, error: 'invalid_auth' };
    }

    return { ok: true, members: db.users };
  });
}
