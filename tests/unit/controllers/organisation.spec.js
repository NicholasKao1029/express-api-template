const organisationController = require('../../../src/controllers/organisation.js');
const organisationService = require('../../../src/services/organisation.js');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const organisationMock = require('../mocks/organisation.js');

describe('Organisation Controller', () => {
    let req;
    let res;
    let orgObj = {};
    let orgId;

    let serviceReturn;

    beforeEach(function () {
        orgObj = organisationMock.singleOrg();

        req = mockReq();
        res = mockRes();

        orgId = orgObj.id;
        req.params.orgId = orgId;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Get all', () => {
        before(() => {
            const amount = 5;
            serviceReturn = organisationMock.listOrganisations(amount);
        });

        it('service layer called correctly', () => {
            sinon.stub(organisationService, 'find').resolves(serviceReturn);
            organisationController.getAllOrganisation(req, res);
            sinon.assert.calledOnce(organisationService.find);
        });

        describe('succces case', () => {
            beforeEach(() => {
                sinon.stub(organisationService, 'find').resolves(serviceReturn);
            });

            it('send status `200`', async () => {
                req.params.orgId = orgId;
                await organisationController.getAllOrganisation(req, res);
                sinon.assert.calledWith(res.status, 200);
            });

            it('send orgs as json', async () => {
                req.params.orgId = orgId;
                await organisationController.getAllOrganisation(req, res);
                sinon.assert.calledWith(res.json, serviceReturn);
            });
        });

        describe('error case', () => {
            const errorMessage = 'Generic Error Message';
            const exceptionType = new Error(errorMessage);
            beforeEach(() => {
                sinon.stub(organisationService, 'find').rejects(exceptionType);
            });

            it('sends status `404`', async () => {
                await organisationController.getAllOrganisation(req, res);
                sinon.assert.calledWith(res.status, 404);
            });

            it('sends status error message', async () => {
                await organisationController.getAllOrganisation(req, res);
                sinon.assert.calledWith(res.send, errorMessage);
            });
        });
    });

    describe('Get via Id', () => {
        it('service layer called correctly', () => {
            sinon.stub(organisationService, 'findById').resolves(orgObj);
            organisationController.getOrganisation(req, res);
            sinon.assert.calledWith(
                organisationService.findById,
                req.params.orgId
            );
        });

        describe('succces case', () => {
            beforeEach(() => {
                sinon.stub(organisationService, 'findById').resolves(orgObj);
            });

            it('send status `200`', async () => {
                req.params.orgId = orgId;
                await organisationController.getOrganisation(req, res);
                sinon.assert.calledWith(res.status, 200);
            });

            it('send org as json', async () => {
                req.params.orgId = orgId;
                await organisationController.getOrganisation(req, res);
                sinon.assert.calledWith(res.json, orgObj);
            });
        });

        describe('error case', () => {
            const errorMessage = 'Generic Error Message';
            const exceptionType = new Error(errorMessage);
            beforeEach(() => {
                sinon
                    .stub(organisationService, 'findById')
                    .rejects(exceptionType);
            });

            it('sends status `404`', async () => {
                await organisationController.getOrganisation(req, res);
                sinon.assert.calledWith(res.status, 404);
            });

            it('sends status error message', async () => {
                await organisationController.getOrganisation(req, res);
                sinon.assert.calledWith(res.send, errorMessage);
            });
        });
    });
});
