const organisationService = require('../../../src/services/organisation.js');
const organisationDao = require('../../../src/daos/organisation.js');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const errorMessage = require('../../../src/errors/messages.js');
const organisationMock = require('../mocks/organisation.js');

chai.use(chaiAsPromised);

describe('Organisation Service', () => {
    let orgObj = {};
    let orgId;
    let daoReturn;

    beforeEach(() => {
        orgObj = organisationMock.singleOrg();

        daoReturn = { ...orgObj };

        orgId = orgObj.id;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('find all', () => {
        before(() => {
            const amount = 5;
            daoReturn = organisationMock.listOrganisations(amount);
        });

        it('dao layer called correctly', () => {
            sinon.stub(organisationDao, 'getAll').resolves(daoReturn);
            organisationService.find(orgId);
            sinon.assert.calledOnce(organisationDao.getAll);
        });

        describe('success case, no error thrown from DAO', () => {
            it('returns organisation object', async () => {
                sinon.stub(organisationDao, 'getAll').resolves(daoReturn);
                const returnOrganisation = await organisationService.find(
                    orgId
                );
                expect(returnOrganisation).to.deep.equal(orgObj);
            });

            it('handles no organisation with passed in id', async () => {
                sinon.stub(organisationDao, 'getAll').resolves(undefined);
                return expect(organisationService.find(-1))
                    .to.eventually.be.rejectedWith(
                        errorMessage.resourceDoesNotExist
                    )
                    .and.be.an.instanceOf(Error);
            });
        });

        describe('error case', () => {
            const errorMessage = 'DB error';
            const exceptionType = new Error(errorMessage);

            beforeEach(() => {
                sinon.stub(organisationDao, 'getAll').rejects(exceptionType);
            });

            it('throws error to caller', async () => {
                return expect(organisationService.find(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });

    describe('find via Id', () => {
        it('dao layer called correctly', () => {
            sinon.stub(organisationDao, 'getById').resolves(daoReturn);
            organisationService.findById(orgId);
            sinon.assert.calledWith(organisationDao.getById, orgId);
        });

        describe('success case, no error thrown from DAO', () => {
            it('returns organisation object', async () => {
                sinon.stub(organisationDao, 'getById').resolves(daoReturn);
                const returnOrganisation = await organisationService.findById(
                    orgId
                );
                expect(returnOrganisation).to.deep.equal(orgObj);
            });

            it('handles no organisation with passed in id', async () => {
                sinon.stub(organisationDao, 'getById').resolves(undefined);
                return expect(organisationService.findById(-1))
                    .to.eventually.be.rejectedWith(
                        errorMessage.resourceDoesNotExist
                    )
                    .and.be.an.instanceOf(Error);
            });
        });

        describe('error case', () => {
            const errorMessage = 'DB error';
            const exceptionType = new Error(errorMessage);

            beforeEach(() => {
                sinon.stub(organisationDao, 'getById').rejects(exceptionType);
            });

            it('throws error to caller', async () => {
                return expect(organisationService.findById(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });
});
