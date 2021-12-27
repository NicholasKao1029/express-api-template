const OrganisationModel = require('../models/index.js').organisation;

const getAll = async () => {
    const organisation = await OrganisationModel.findAll();
    return organisation;
};

const getById = async (id) => {
    // TODO: abstract generation of pure equality query into a function
    const query = {
        where: {
            id: id
        }
    };
    const organisation = await OrganisationModel.findOne(query);

    return organisation;
};

module.exports = {
    getById,
    getAll
};
