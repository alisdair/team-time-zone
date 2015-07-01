import Ember from 'ember';

function invalidTokenResponse(token) {
  let error;

  if (Ember.isNone(token)) {
    error = 'not_authed';
  }

  if (token === 'invalid') {
    error =  'invalid_auth';
  }

  if (error) {
    return {
      ok: false,
      error
    };
  }
}

export default function() {
  this.get('/slack/users.list', function(db, request) {
    let response = invalidTokenResponse(request.queryParams.token);
    if (!Ember.isNone(response)) {
      return response;
    }

    return { ok: true, members: db.users };
  });

  this.get('/slack/users.info', function(db, request) {
    let response = invalidTokenResponse(request.queryParams.token);
    if (!Ember.isNone(response)) {
      return response;
    }

    let user = db.users.find(request.queryParams.user);
    if (Ember.isNone(user)) {
      return {
        ok: false,
        error: 'user_not_found'
      };
    }

    // FIXME: no support for errors 'user_not_visible' and 'account_inactive'

    return {
      ok: true,
      user
    };
  });
}
