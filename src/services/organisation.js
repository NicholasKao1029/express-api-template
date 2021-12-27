const organisationDao = require('../daos/organisation.js');
const errorMessages = require('../errors/messages.js');

const find = async () => {
    let organisation;

    try {
        organisation = await organisationDao.getAll();

        if (organisation) {
            return organisation;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

const findById = async (id) => {
    let organisation;

    try {
        organisation = await organisationDao.getById(id);

        if (organisation) {
            return organisation;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    findById,
    find
};
