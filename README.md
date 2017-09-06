# Timesheet Technical Demonstration

The purpose of this demonstration is to exhibit familiarity with next generation Angular frontend technologies,
programming patterns and to provide a sample of what clean and reusable code means to me.

## Disclaimer

This project has limitations and was time-bound to no more than 3 days - inhibiting the depth of many professional behaviours, including:

 * localisation, browser, user
 * auto-prefix scss
 * media queries
 * build-agent deployment
 * ...
 
Therefore the design reflects a personal goal to effectively demonstrate key principles, facilitate peer review and start a ongoing conversation.

## User Interface

The UI is a simple mobile-first interface (with all measurements in REMs), developed and tested within Chrome.

# Pre-Requisits

Both the Angular-cli and this project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

# Getting started

Documentation of project features can be found within the `gherkins/` directory.
Checkout or unzip this code to your local machine.
Run `npm install` to download the dependent (Angular) libraries.
Run `npm run start` to enable the dev server to run the project locally
Browse to `https://localhost:4200/`
 
## Development server

Run `npm run start` for the dev server. Navigate to `http://localhost:4200/`.
The server will watch for any source files changes and automatically reload.

## Code scaffolding

Whilst available within the angular-cli, no scaffolding tools were used to generate file structure or code for this project.

## Running unit tests

Run `npm test` to execute the 81 unit test specs in Chrome via [Karma](https://karma-runner.github.io).

## Generating code coverage report

Run `npm run coverage` to generate a 100% unit test coverage report, which can then be opened from the `coverage/` directory.

## Running E2E tests

Run `npm run e2e` to execute the complete set of acceptance tests in Chrome via [Protractor](http://www.protractortest.org).

## Build

Run `npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory. Use `--prod` flag for a production build.

## Further help

If you have issues please:

 * ensure you have Node v6.9.0+ and vNPM 3+
 * see the latest [Angular browser matrix](https://angular.io/docs/ts/latest/guide/browser-support.html)
 * contact the author (me)
