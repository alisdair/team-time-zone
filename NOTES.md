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

---

Pretty good state with mirage now. I can build out a custom Ember Data adapter for the users endpoint of the Slack API, with tests, then work from there.

Not sure how to take a list of users and group them usefully by timezone. Maybe a component structure:

* Timezone list: takes users, renders a list of zero or more columns
* Timezone column: includes zero or more timezone groups
* Timezone group: users at the same time, with one or more timezones (different labels/names possible)
* User: displays the avatar, name, username

---

Need to create our own ember simple auth authorizer to modify the data object of the jqXhr, adding the token.

Writing integration tests for the adapter isn't going to work.

---

The RESTSerializer should work lmost fine for most models, I think. Maybe a subclass to remove the `ok` root attribute would be enough.

Unfortunately the users endpoint needs a custom serializer, for two reasons:

1. The list endpoint has a root key of `members`, so extractArray won't work until that's munged.

2. Each user has an embedded `profile` hash that needs to be flattened out. Also we don't care about all of the information in there, so we might just want to pull out some of it.

This is no big deal.

---

Serializer basically done! Except for the profile hash for users.

I think the next task is to sort out the token mugning in an authorizer. Either that or building out the real UI with our working mirage test data.

---

Look into making [torii](https://github.com/Vestorly/torii) work with Slack. Notes:

* Appears to not set a STATE parameter; easiest way to check this is to try it
* Only gets us as far as the authentication code, which we still need to send to our server to get the acccess token
* Works with ember-simple-auth, but I'm not sure how

---

Okay, so we have:

* A shit but working authorizer
* A stubbed out authenticator
* Working mirage test stubs

On all this authorisation junk, we need to:

* Integrate and customise torii to hit Slack's real oauth2 endpoint
* Build a real authenticator (more likely just use the oauth2 one)
* Test everything

Other things that need doing:

* Extend the ember-lightning app to act as an oauth2 authorizer
* Fix torii to not use fixed STATE
* Import the UI from JSBin
* Styles for everything
* More testing again forever
* Pick a good domain name

Goals:

* Write up some things you've learned
* Maybe come up with a talk or two

---

Started on the UI. Build some crappy components.

Next steps on components:

* Group users within a column into timezones, ordered ascending
* Extract a timezone-group component, orders users by name, displays TZ and current time too
* Extract a timezone-user component, which does a less shitty job of rendering the user

UI thought:

* Top level search filter for users? Don't want to affect columns so not sure how to make that work

Other thought:

* These randomly generated users are not great. Too much variation makes it hard to follow what's happening. Should have fixed test/demo data instead.

* Would be cool for the real app to be able to display fake data too, until people are logged in.

---

Dealt with the randomly generated users with a Mirage scenario. Would be really cool to use the same data to build fake users for the real app when logged out, if at all possible.

All the above UI work is still pending and probably the most fun to do next. Then it's really just finishing off the authentication and deployment infrastructure.

---

UI work now done, except for somehow showing fake data when not logged in. The components have some complex code in them that should be tested.

---

Need to write tests for (and refactor/recompose) the timezone-collection component. And it would be good to completely rework the navbar into a component, if that's possible.
