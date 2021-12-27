const errorMessage = require('./messages.js');

const httpStatusMap = {};

httpStatusMap[errorMessage.resourceDoesNotExist] = 404;
httpStatusMap[errorMessage.genericDatabaseError] = 503;
httpStatusMap[errorMessage.invalidUpdateAttribute] = 400;
httpStatusMap[errorMessage.missingCreationAttribute] = 400;
httpStatusMap[errorMessage.genericEmptyBody] = 400;

const getStatusFromError = (error) => {
    const message = error.message;
    if (message in httpStatusMap) {
        return httpStatusMap[message];
    }

    return 404;
};

module.exports = {
    httpStatusMap,
    getStatusFromError
};
