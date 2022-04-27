# Supermetrics Google Data Studio Assignment

## Your task

In this repo there is an incomplete implementation of a very basic Data Studio connector.

The connector already has user authentication, connection configuration, and schema retrieval implemented. You should,

### 1. Implement the `getData` function to provide all metrics and dimensions described in the schema

You should fetch the data from the API described below, making use of the configuration values provided by the user. The data provided by the API will require some processing to produce the correct metrics and dimensions.

It is expected that the user will provide their own `client_id` when authenticating the connector, you can use `ju16a6m81mhid5ue1z3v2g0uh` for testing.

Use the following endpoint to register a token:

**POST:** `https://api.supermetrics.com/assignment/register`

**PARAMS:**

```
*client_id:* Client ID from user authentication

*email:* User's email from configuration screen

*name:* User's name from configuration screen
```

**RETURNS**

```
*sl_token:* This token string should be used in the subsequent queries. Please note that this token will only last 1 hour from when the REGISTER call happens. You will need to register and fetch a new token as you need it.

*client_id:* Returned for informational purposes only

*email:* Returned for informational purposes only
```

Use the following endpoint to fetch posts:

**GET:** `https://api.supermetrics.com/assignment/posts`

**PARAMS:**

```
*sl_token:* Token from the register call

*page:* Integer page number of posts (1-10)
```

**RETURNS:**

```
*page:* What page was requested or retrieved

*posts:* 100 posts per page
```

### 2. Support the "Post limit" setting

The user can configure a limit on the number of posts fetched from the API, your implementation of `getData` should respect this setting.

### 3. Improve the connector (Optional)

The connector is very simple, and not necessarily written following best practices. Feel free to refactor or extend any part of the connector code. Even if you choose not to improve the connector much, we will discuss potential improvements in the interview.

## Background info

[Google Apps Script](https://developers.google.com/apps-script) is a Google-hosted JavaScript environment. All [Google Data Studio](https://datastudio.google.com/) community connectors are developed and run in this environment. There is a [web editor](https://script.google.com/home/start) available for Apps Script, but at Supermetrics we typically prefer to write code locally and push to the cloud environment via [clasp](https://github.com/google/clasp). The web editor is still useful for testing and deployment of the connector however.

Reasonably-detailed documented on writing Data Studio connectors can be [found here](https://developers.google.com/datastudio/connector).

In order to deploy and test your connector you will require a Google account, and will have to accept the Terms & Conditions of use for Data Studio.

## Getting started

After installing the project dependencies via `yarn`, you can run the convenience script `yarn setup` to login to `clasp` and create a new script to work with. You can push your local code to the script with `yarn build`.
