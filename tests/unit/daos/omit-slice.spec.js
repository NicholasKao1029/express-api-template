const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { makeMockModels } = require('sequelize-test-helpers');

chai.use(chaiAsPromised);

describe('Widget Settings Dao', () => {
    const user = { findOne: sinon.stub(), findAll: sinon.stub() };
    const mockModels = makeMockModels({ user });

    const daoPath = '../../../src/daos/user.js';
    const userDao = proxyquire(daoPath, {
        '../models/index.js': mockModels
    });

    let userObj = {};
    let orgId;
    let databaseReturn;
    let databaseReturnNoNarrationSetting;

    beforeEach(() => {
        userObj = {
            id: 1,
            organisation_id: 18,
            color: '#e69420',
            background_color: '#e6e6fa',
            language: 'en',
            border_color: '#b03060',
            border_opacity: 5,
            border_thickness: 5,
            border_radius: 10,
            image: 'https://storage.googleapis.com/ad-auris-mvp-bucket/publication_logo_images/la_noticia.jpg',
            title: false,
            label: null,
            font_family: null,
            font_colour: null,
            font_size: null,
            font_weight: null,
            logo_colour: null,
            play_app_link_included: true,
            play_app_link_text: null,
            play_app_link: null
        };
        orgId = userObj.organisation_id;
    });

    afterEach(() => {
        sinon.restore();
    });
    describe('Find by organisation Id', () => {
        before(() => {
            databaseReturn = { userObj };
            databaseReturnNoNarrationSetting = null;
        });
        it('Get user model called correctly', async () => {
            user.findOne.resolves(databaseReturn);
            await userDao.getAllByOrganisationId(orgId);
            const query = {
                where: {
                    organisation_id: orgId
                }
            };
            sinon.assert.calledWith(user.findAll, sinon.match(query));
        });

        describe('succces case', () => {
            before(() => {
                databaseReturnNoNarrationSetting = null;
            });
            it('return query answer', async () => {
                user.findAll.resolves(databaseReturn);
                const result = await userDao.getAllByOrganisationId(orgId);
                expect(result).to.deep.equal(databaseReturn);
            });

            it('handles no organisation with id', async () => {
                user.findAll.resolves(databaseReturnNoNarrationSetting);
                const result = await userDao.getAllByOrganisationId(orgId);
                expect(result).to.deep.equal(null);
            });
        });

        describe('error case', () => {
            const errorMessage = 'DB error';
            const exception = new Error(errorMessage);

            before(() => {
                user.findAll.rejects(exception);
            });

            it('throws error to caller', async () => {
                return expect(userDao.getAllByOrganisationId(orgId))
                    .to.eventually.be.rejectedWith(errorMessage)
                    .and.be.an.instanceOf(Error);
            });
        });
    });

    //describe('Update by orgId', () => {
    //    // NOTE: due to technical debt where we would post new widget settings,
    //    // NOTE: we update all settings to make sure they apply
    //    //
    //    const updateObj = {
    //        border_color: '#ffffff',
    //        border_thickness: 1000
    //    };

    //    before(() => {
    //        databaseReturn = [
    //            2,
    //            [
    //                {
    //                    id: 1,
    //                    organisation_id: 18,
    //                    color: '#e69420',
    //                    background_color: '#e6e6fa',
    //                    language: 'en',
    //                    border_color: '#ffffff',
    //                    border_opacity: 5,
    //                    border_thickness: 1000,
    //                    border_radius: 10,
    //                    image: 'https://storage.googleapis.com/ad-auris-mvp-bucket/publication_logo_images/la_noticia.jpg',
    //                    title: false,
    //                    label: null,
    //                    font_family: null,
    //                    font_colour: null,
    //                    font_size: null,
    //                    font_weight: null,
    //                    logo_colour: null,
    //                    play_app_link_included: true,
    //                    play_app_link_text: null,
    //                    play_app_link: null
    //                },
    //                {
    //                    id: 5,
    //                    organisation_id: 18,
    //                    color: '#e69420',
    //                    background_color: '#e6e6fa',
    //                    language: 'en',
    //                    border_color: '#ffffff',
    //                    border_opacity: 5,
    //                    border_thickness: 1000,
    //                    border_radius: 10,
    //                    image: 'https://storage.googleapis.com/ad-auris-mvp-bucket/publication_logo_images/la_noticia.jpg',
    //                    title: false,
    //                    label: null,
    //                    font_family: null,
    //                    font_colour: null,
    //                    font_size: null,
    //                    font_weight: null,
    //                    logo_colour: null,
    //                    play_app_link_included: true,
    //                    play_app_link_text: null,
    //                    play_app_link: null
    //                }
    //            ]
    //        ];
    //        databaseReturnNoNarrationSetting = [0, []];
    //    });

    //    it('Update widget settings model called correctly', async () => {
    //        user.findAll.resolves(databaseReturn);
    //        await userDao.updateByOrgId(orgId, updateObj);
    //        const options = {
    //            returning: true,
    //            where: {
    //                organisation_id: orgId
    //            }
    //        };
    //        sinon.assert.calledWith(user.update, sinon.match(updateObj), sinon.match(options));
    //    });

    //    describe('succces case', () => {
    //        it('return query answer', async () => {
    //            user.update.resolves(databaseReturn);
    //            const result = await userDao.updateByOrgId(orgId);
    //            expect(result).to.deep.equal(databaseReturn);
    //        });

    //        it('handles no organisation with id', async () => {
    //            user.update.resolves(databaseReturnNoNarrationSetting);
    //            const result = await userDao.updateByOrgId(orgId);
    //            expect(result).to.deep.equal(databaseReturnNoNarrationSetting);
    //        });
    //    });

    //    describe('error case', () => {
    //        const errorMessage = 'DB error';
    //        const exception = new Error(errorMessage);

    //        before(() => {
    //            user.update.rejects(exception);
    //        });

    //        it('throws error to caller', async () => {
    //            return expect(userDao.updateByOrgId(orgId))
    //                .to.eventually.be.rejectedWith(errorMessage)
    //                .and.be.an.instanceOf(Error);
    //        });
    //    });
    //});
});
