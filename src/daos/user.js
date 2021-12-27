const UserModel = require('../models/index.js').user;

const _findByOrganisationId = (orgId) => {
    return {
        where: {
            organisation_id: orgId
        }
    };
};

const _findByOrganisationIdAndId = (orgId, id) => {
    return {
        where: {
            organisation_id: orgId,
            id: id
        }
    };
};

const getAllByOrganisationId = async (orgId) => {
    const query = _findByOrganisationId(orgId);
    const userList = await UserModel.findAll(query);

    return userList;
};

const getByIdAndOrganisationId = async (userId, id) => {
    const query = _findByOrganisationIdAndId(userId, id);

    const user = await UserModel.findOne(query);

    return user;
};

const create = async (model) => {
    options = {
        returning: true
    };

    return UserModel.create(model);
};

const updateByIdAndOrgId = async (userId, id, updateObj) => {
    const query = _findByOrganisationIdAndId(userId, id);
    query.returning = true;
    return UserModel.updateByIdAndOrgId(updateObj, query);
};

const deleteByIdAndOrganisationId = async (userId, id) => {
    const query = _findByOrganisationIdAndId(userId, id);
    return UserModel.destroy(query);
};

module.exports = {
    getAllByOrganisationId,
    getByIdAndOrganisationId,
    create,
    updateByIdAndOrgId,
    deleteByIdAndOrganisationId
};
