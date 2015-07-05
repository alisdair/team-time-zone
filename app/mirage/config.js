import Ember from 'ember';

export default function() {
  this.get('/slack/users.list', function(db) {
    return { ok: true, members: db.users };
  });

  this.get('/slack/users.info', function(db, request) {
    let user = db.users.find(request.queryParams.user);
    if (Ember.isNone(user)) {
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
}
