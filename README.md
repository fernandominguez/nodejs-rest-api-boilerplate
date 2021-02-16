# Node.js RESTful API Boilerplate

![API Tests](https://github.com/fernandominguez/nodejs-rest-api-boilerplate/workflows/API%20Tests/badge.svg)
![CodeQL](https://github.com/fernandominguez/nodejs-rest-api-boilerplate/workflows/CodeQL/badge.svg)

This is a boilerplate for starting a Node.js RESTful API project.

**Want to [contribute](https://github.com/fernandominguez/nodejs-rest-api-boilerplate/blob/master/CONTRIBUTING.md)?**

## How to install

1. Install Node.js from [nodejs.org](http://nodejs.org/).
2. Just clone the repository using `git clone https://github.com/fernandominguez/nodejs-rest-api-boilerplate.git`
3. Run `npm install` in your favourite shell.

## Testing

- For running unit tests on your local machine, just run `docker-compose up --build`.
- For debugging on your local machine, just run `docker-compose -f docker-compose.dev.yml up --build`

This boilerplate is ready to be tested with the [Github Actions](https://github.com/features/actions) workflows.
You only have to do a `git push` to your `main` branch and you will see the result in this file header banners.

There are two workflows:

1. API Tests: Performs the CI jobs and test if the changes fullfill the existing unit tests.
2. CodeQL: Checks the repository's source code to find security vulnerabilities related to the coding language used (JavaScript).

## Authentication

The access to the API is done through API keys. To create an API key you have to create first a JWT private word to sign them.

This API expects the API key to be included in all API request to the server in a header that looks like the following:

```shell
Authorization: Bearer API_KEY
```

**HTTP Request:**

```shell
GET https://api.the-api.url/v1/auth
```

**Call example to test your API key:**

```shell
curl "https://api.the-api.url/v1/auth"
  -H "Authorization: Bearer API_KEY"
```

**Returns a JSON array like this:**

```json
{
  "message": "Authorized",
  "project": "Project Name"
}
```

## Account

To check an account status at any time you can use this endpoint.

It will respond with the user quota and current usage levels.

**HTTP Request:**

```shell
GET https://api.the-api.url/v1/account
```

**Call example to test your API key:**

```shell
curl "https://api.the-api.url/v1/account"
  -H "Authorization: Bearer API_KEY"
```

**Returns a JSON array like this:**

```json
{
  "creation_date": "2021-01-31T21:00:08.452Z",
  "uid": "oinenBADDnnelADDj83CAC98704R",
  "paid_plan_name": "API Basic",
  "image_api_quota": 1000,
  "image_api_usage": 345,
  "current_project": {
    "name": "Project Name"
  }
}
```

## Requirements

- Server: NodeJS
- Database: MongoDB
- NodeJS dependencies:
  - bcryptjs (for token creation)
  - body-parser (for parsing incoming request)
  - compression (for compressing the response bodies)
  - cors (for securitizing the API requests)
  - crypto (for secret and token creation)
  - dotenv-flow (for managing .env files)
  - express (web framework for the server)
  - fs (for file manipulation)
  - helmet (for securitizing the API requests)
  - http (for creating the HTTP API server)
  - jsonwebtoken (for JWT token authentication)
  - mongoose (for MongoDB connection)
  - nodemon (for restarting the server on changes)

### Author: [Fernando Domínguez](https://fernandominguez.es)

### License: [MIT](https://github.com/fernandominguez/nodejs-rest-api-boilerplate/blob/main/LICENSE)
