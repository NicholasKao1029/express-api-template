const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { makeMockModels } = require('sequelize-test-helpers');
const mockOrganisation = require('../mocks/organisation.js');

chai.use(chaiAsPromised);

describe('Organisation Dao', () => {
    // NOTE: might be necessary to use below afte using DI with models;
    const organisation = { findOne: sinon.stub(), findAll: sinon.stub() };
    const mockModels = makeMockModels({ organisation });

    const daoPath = '../../../src/daos/organisation.js';
    const organisationDao = proxyquire(daoPath, {
        '../models/index.js': mockModels
    });

    let orgObj = {};
    let orgId;
    let databaseReturn;
    let noDatabaseReturn;

    // let fakeOrganisation;

    beforeEach(() => {
        orgObj = mockOrganisation.singleOrg();
        databaseReturn = { orgObj };
        orgId = orgObj.id;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Find All', () => {
        before(() => {
            const amount = 5;
            databaseReturn = mockOrganisation.listOrganisations(amount);
            noDatabaseReturn = [];
        });

        it('Get organisation model called correctyly', async () => {
            organisation.findAll.resolves(databaseReturn);
            await organisationDao.getAll(orgId);
            sinon.assert.calledOnce(organisation.findAll);
        });

        describe('succces case', () => {
            it('return query answer', async () => {
                organisation.findAll.resolves(databaseReturn);
                const result = await organisationDao.getAll(orgId);
                expect(result).to.deep.equal(databaseReturn);
            });

            it('handles no organisations', async () => {
                organisation.findAll.resolves(noDatabaseReturn);
                const result = await organisationDao.getAll(orgId);
                expect(result).to.deep.equal([]);
            });
        });

        describe('error case', () => {
            const errorMessage = 'DB error';
            const exception = new Error(errorMessage);

            before(() => {
                organisation.findAll.rejects(exception);
            });

            it('throws error to caller', async () => {
                return expect(organisationDao.getAll(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });

    describe('Find by Id', () => {
        it('Get organisation model called correctyly', async () => {
            organisation.findOne.resolves(databaseReturn);
            await organisationDao.getById(orgId);
            const query = {
                where: {
                    id: orgId
                }
            };
            sinon.assert.calledWith(organisation.findOne, sinon.match(query));
        });

        describe('succces case', () => {
            it('return query answer', async () => {
                organisation.findOne.resolves(databaseReturn);
                const result = await organisationDao.getById(orgId);
                expect(result).to.deep.equal(databaseReturn);
            });

            it('handles no organisation with id', async () => {
                organisation.findOne.resolves(null);
                const result = await organisationDao.getById(orgId);
                expect(result).to.deep.equal(null);
            });
        });

        describe('error case', () => {
            const errorMessage = 'DB error';
            const exception = new Error(errorMessage);

            before(() => {
                organisation.findOne.rejects(exception);
            });

            it('throws error to caller', async () => {
                return expect(organisationDao.getById(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });
});
