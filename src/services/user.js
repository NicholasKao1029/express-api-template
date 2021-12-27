const userDao = require('../daos/user.js');
const errorMessages = require('../errors/messages.js');
const { assertAttributesSubset, assertAttributesAll } = require('./utils.js');

const findByOrganisationId = async (orgId) => {
    let userList;

    try {
        userList = await userDao.getAllByOrganisationId(orgId);

        if (userList) {
            return userList;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

const findByIdAndOrgId = async (orgId, id) => {
    let user;

    try {
        user = await userDao.getByIdAndOrganisationId(orgId, id);

        if (user) {
            return user;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

const neededAttributes = new Set(['name']);

const create = async (orgId, creationObj) => {
    let user;

    creationObj = { organisation_id: orgId, ...creationObj };

    assertAttributesAll(neededAttributes, creationObj);

    try {
        user = await userDao.create(creationObj);

        if (user) {
            return user;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

const deleteOmitSlice = async (orgId, id) => {
    let user;

    try {
        user = await userDao.deleteByIdAndOrganisationId(orgId, id);

        return user;
    } catch (e) {
        throw e;
    }
};

const attributes = new Set(['name']);

const updateByIdAndOrgId = async (orgId, id, updateObj) => {
    let user;

    assertAttributesSubset(attributes, updateObj);

    try {
        user = await userDao.updateByIdAndOrgId(orgId, id, updateObj);

        if (user) {
            return user;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    findByOrganisationId,
    findByIdAndOrgId,
    create,
    deleteOmitSlice,
    updateByIdAndOrgId
};
