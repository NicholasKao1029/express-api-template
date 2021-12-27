# Description

Barebones express API template following the MVC pattern
[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

## NOTES

Prefer `yarn` but `npm` can be used instead.

To install packages run `yarn add ___` and `yarn`.

## Deployment

### Cloud Run

There is a `cloudbuild.yaml` to be used in conjunction with cloudbuild
[Learn more](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)

Or use any deployment platform that can use Docker.

## Code Quality Enforcement

### References:

1. Huksy Set Up https://medium.com/angular-in-depth/husky-6-lint-prettier-eslint-and-commitlint-for-javascript-project-d7174d44735a
2. Lint Config Generator: https://eslint.org/demo#
3. Commit Linting Rules: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

## TODOs

### CI/CD/Devops

-   Make tests be able to run while app is running (current issue: port conflict)
-   Run tests before deployment, only deploy if all pass
-   Local Docker PostGres SQL container
    -   Based on production or development flows use different docker files

### Logging

-   https://github.com/winstonjs/winston
-   SQL logging currently turned off
-   Configurable locally and in production

### Mocks

-   Mock database connection (relates to docker)

### Typescript

-   Common interface/naming for common controller, dao, service functions.
-   interfaces and classes, lower repition.

### Best practices

-   https://expressjs.com/en/advanced/best-practice-performance.html
-   Apply above

### Documentation

-   https://swagger.io/
-   OpenAPI Docs => https://cloud.google.com/api-gateway/docs/openapi-overview

### Testing

-   Unit testing is not expansive
-   E2E testing needs work
