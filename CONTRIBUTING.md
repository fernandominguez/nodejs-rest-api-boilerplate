# Contributing

Thank you for your interest in contributing to this project to make it even better!

Not sure where to start? Check out the currently filed issues to see if there's anything there you'd like to work on.

Please ensure first that someone is not already working on an issue. If the issue seems stale or inactive and you want to take it over, get in touch with fernandominguez, the assigned person (check the comments on the issue for whom), or simply comment on the issue asking for status.

## Manual testing

This project has a built-in manual testing tool called API Tests. It allows you to run a local tests, and generates a tidy report for you to submit for feedback. No coding required, just a few button presses / keyboard taps in a browser window! I would really appreciate your help testing this software on your own unique, local computer.

Once AVRGirl Arduino is globally installed on your machine using npm install -g avrgirl-arduino@latest, type avrgirl-arduino test-pilot into your terminal program and follow the prompts. Shouldn't take more than two minutes of your time, but will make a big difference to ensuring any issues are reported and fixed promptly!

## Feature requests

The best thing to do here is to file an issue if there already isn't one. If it's something fairly obviously needed (in your opinion) and you are happy to code it, feel free to open a pull request without filing an issue first.

## Bugs / Issues

Run a quick look through the currently open and closed issues and pull requests to make sure it hasn't already been reported or closed. If it's unique, feel free to open an issue.

## Code contribution workflow

1. Fork this repository and clone the new fork locally.

2. Run `npm install` to install the dev dependencies.

3. Make your changes in a new git branch: `git checkout -b my-fix-branch master`

4. Follow the coding style of this project. We base our style on the [Google styleguide](https://google.github.io/styleguide/jsguide.html)

5. Create your patch/feature, including appropriate tests.

6. Commit your changes using a descriptive commit message.

7. Rebase on master if your branch falls behind on commits.

8. Run the local tests via `docker-compose up --build` to make sure everything is passing.

9. Push up your new branch to your forked repo.

10. In GitHub, send a pull request to `nodejs-rest-api-boilerplate:master`. Include an explanation of what you did, and reference any issues if they are related.

## Code of conduct

Please read the [code of conduct](https://github.com/fernandominguez/nodejs-rest-api-boilerplate/blob/main/CODE_OF_CONDUCT.md) in the interest of fostering an open and welcoming environment
