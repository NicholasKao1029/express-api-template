const {
    httpStatusMap,
    getStatusFromError
} = require('../../../src/errors/status-codes.js');
const errorMessage = require('../../../src/errors/messages.js');
const assert = require('assert');

describe('error messages should only map to error codes', () => {
    for (const message in httpStatusMap) {
        it(`${message} corresponds to a status code >= 400`, () => {
            assert(httpStatusMap[message] >= 400);
        });
    }
});

describe('getStatusFromError should map error codes to status codes if exist', () => {
    for (const message in httpStatusMap) {
        it(`${message} returns value in httpStatusMap`, () => {
            const error = new Error(message);
            assert(httpStatusMap[message] === getStatusFromError(error));
        });
    }
});

describe('errorMessages should have a corresponding entry in httpStatusMap', () => {
    for (const key in errorMessage) {
        const message = errorMessage[key];
        it(`${message} exists in statusMap`, () => {
            assert(message in httpStatusMap);
        });
    }
});
