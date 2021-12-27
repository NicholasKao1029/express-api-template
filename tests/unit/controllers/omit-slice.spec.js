const userController = require('../../../src/controllers/user.js');
const userService = require('../../../src/services/user.js');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const errorMessages = require('../../../src/errors/messages.js');

describe('Widget Setting Controller', () => {
    let req;
    let res;
    let userObj = {};
    let userId;
    let serviceLayerReturn;

    beforeEach(function () {
        serviceLayerReturn = [];
        userObj = {};

        req = mockReq();
        res = mockRes();

        userId = userObj.userId;
        req.params.userId = userId;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Get via organisation Id', () => {
        it('service layer called correctly', () => {
            sinon.stub(userService, 'findByOrganisationId').resolves(userObj);
            userController.getAll(req, res);
            sinon.assert.calledWith(userService.findByOrganisationId, req.params.userId);
        });

        describe('succces case', () => {
            beforeEach(() => {
                sinon.stub(userService, 'findByOrganisationId').resolves(userObj);
            });

            it('send status `200`', async () => {
                req.params.userId = userId;
                await userController.getAll(req, res);
                sinon.assert.calledWith(res.status, 200);
            });

            it('send org as json', async () => {
                req.params.userId = userId;
                await userController.getAll(req, res);
                sinon.assert.calledWith(res.json, userObj);
            });
        });

        describe('error case', () => {
            const errorMessage = 'Generic Error Message';
            const exceptionType = new Error(errorMessage);
            beforeEach(() => {
                sinon.stub(userService, 'findByOrganisationId').rejects(exceptionType);
            });

            it('sends status `404`', async () => {
                await userController.getAll(req, res);
                sinon.assert.calledWith(res.status, 404);
            });

            it('sends status error message', async () => {
                await userController.getAll(req, res);
                sinon.assert.calledWith(res.send, errorMessage);
            });
        });
    });

    describe('Get via user id', () => {
        const validRequestBody = {};

        const invalidRequestBody = {};

        before(() => {});

        it('service layer called correctly', () => {
            sinon.stub(userService, 'updateByOrgId').resolves(userObj);
            userController.patchWidgetSettings(req, res);
            sinon.assert.calledWith(userService.updateByOrgId, req.params.orgId);
        });

        describe('succes case', () => {
            beforeEach(() => {
                sinon.stub(userService, 'updateByOrgId').resolves(userObj);
                req.body = validRequestBody;
            });

            it('send status `200`', async () => {
                req.params.orgId = userId;
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.status, 200);
            });

            it('send org as json', async () => {
                req.params.orgId = userId;
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.json, userObj);
            });
        });

        describe('error case', () => {
            const errorMessage = 'Generic Error Message';
            const exceptionType = new Error(errorMessage);
            beforeEach(() => {
                sinon.stub(userService, 'updateByOrgId').rejects(exceptionType);
            });

            it('sends status `404`', async () => {
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.status, 404);
            });

            it('sends status error message', async () => {
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.send, errorMessage);
            });
        });

        describe('Update object attributes incorrect wtf', () => {
            const exception = new Error(errorMessages.invalidUpdateAttribute);
            beforeEach(() => {
                sinon.stub(userService, 'updateByOrgId').rejects(exception);
                req.body = invalidRequestBody;
            });

            it('sends status `400`', async () => {
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.status, 400);
            });

            it('sends status error message', async () => {
                await userController.patchWidgetSettings(req, res);
                sinon.assert.calledWith(res.send, errorMessages.invalidUpdateAttribute);
            });
        });
    });
});
