Need a small auth server to make this work.

OAuth flow:

*   User tries to access an authentication-required page, is redirected to /login

*   Login page explains the deal and has a button which will redirect to:

        https://slack.com/oauth/authorize?scope=read&client_id=CLIENT_ID&state=RANDOM_STATE

*   Login redirect stores the `RANDOM_STATE` parameter in the session

*   User accepts the Slack auth request, and is redirected back to:

        http://slacktime.zone/authorize?state=RANDOM_STATE&code=CODE

*   Our app then needs to submit a request to our API server including `CODE`

*   Our API server submits a request to the Slack API:

        https://slack.com/api/oauth.access

    Including our CLIENT_ID, CLIENT_SECRET, and CODE. This will return a token, which we send back to the Ember app

*   We then use ember-simple-auth to send the token on every request to the Slack API

---

Deploy with this:

https://github.com/ember-cli/ember-cli-deploy

And probably base the simple API server on this:

https://github.com/philipheinser/ember-lightning

---

How do we handle .env management for the server side secret(s)?

---

Maybe we can do some API emulation to build out the UI