const userService = require('../../../src/services/user.js');
const userDao = require('../../../src/daos/user.js');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const errorMessage = require('../../../src/errors/messages.js');

chai.use(chaiAsPromised);

describe('Omit Slice Service', () => {
    let userObj = {};

    let orgId = userObj.organisation_id;
    let daoReturn;
    let daoReturnNoOrg;

    afterEach(() => {
        sinon.restore();
    });

    describe('Get via organisation Id', () => {
        before(() => {
            daoReturn = { ...userObj };
            daoReturnNoOrg = null;
        });

        it('dao layer called correctly', () => {
            sinon.stub(userDao, 'getAllByOrganisationId').resolves(daoReturn);
            userService.findByOrganisationId(orgId);
            sinon.assert.calledWith(userDao.getAllByOrganisationId, orgId);
        });

        describe('success case, no error thrown from DAO', () => {
            it('returns organisation object', async () => {
                sinon
                    .stub(userDao, 'getAllByOrganisationId')
                    .resolves(daoReturn);
                const returnOrganisation =
                    await userService.findByOrganisationId(orgId);
                expect(returnOrganisation).to.deep.equal(userObj);
            });

            it('handles no organisation with passed in id', async () => {
                sinon
                    .stub(userDao, 'getAllByOrganisationId')
                    .resolves(daoReturnNoOrg);
                return expect(userService.findByOrganisationId(-1))
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
                sinon
                    .stub(userDao, 'getAllByOrganisationId')
                    .rejects(exceptionType);
            });

            it('throws error to caller', async () => {
                return expect(userService.findByOrganisationId(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });

    describe('Get by id', () => {
        const updateObj = {
            border_color: '#ffffff',
            border_thickness: 1000
        };

        const invalidUpdateObj = {
            border_color: '#ffffff',
            border_thickness: 1000,
            wrong_attribute: 'wrong attribute'
        };

        before(() => {
            daoReturn = [];

            daoReturnNoOrg = [];
        });

        // it('dao layer called correctly', async () => {

        //     sinon.stub(userDao, 'updateByOrgId').resolves(daoReturn);
        //     await userService.updateByOrgId(orgId, updateObj);
        //     sinon.assert.calledWith(userDao.updateByOrgId, orgId, sinon.match(updateObj));
        // });

        // describe('success case, no error thrown from DAO', () => {
        //     it('returns organisation object', async () => {
        //         sinon.stub(userDao, 'updateByOrgId').resolves(daoReturn);
        //         const returnOrganisation = await userService.updateByOrgId(orgId, updateObj);
        //         expect(returnOrganisation).to.deep.equal(daoReturn[1]);
        //     });

        //     it('handles no organisation with passed in id', async () => {
        //         sinon.stub(userDao, 'updateByOrgId').resolves(daoReturnNoOrg);
        //         return expect(userService.updateByOrgId(-1, updateObj))
        //             .to.eventually.be.rejectedWith(errorMessage.resourceDoesNotExist)
        //             .and.be.an.instanceOf(Error);
        //     });
        // });

        // describe('error case', () => {
        //     const errorMessage = 'DB error';
        //     const exceptionType = new Error(errorMessage);

        //     beforeEach(() => {
        //         sinon.stub(userDao, 'updateByOrgId').rejects(exceptionType);
        //     });

        //     it('throws error to caller', async () => {
        //         return expect(userService.updateByOrgId(orgId, updateObj))
        //             .to.eventually.be.rejectedWith(errorMessage)
        //             .and.be.an.instanceOf(Error);
        //     });
        // });

        // describe('update object attributes incorrect', () => {
        //     it('updating with invalid attributes', async () => {
        //         return expect(userService.updateByOrgId(-1, invalidUpdateObj))
        //             .to.eventually.be.rejectedWith(errorMessage.invalidUpdateAttribute)
        //             .and.be.an.instanceOf(Error);
        //     });

        //     const invalids = [{}, undefined, null];
        //     for (const invalid of invalids) {
        //         it(`throw invalid update attribute for ${invalid}`, () => {
        //             return expect(userService.updateByOrgId(-1, invalid))
        //                 .to.eventually.be.rejectedWith(errorMessage.invalidUpdateAttribute)
        //                 .and.be.an.instanceOf(Error);
        //         });
        //     }
        // });
    });
});
