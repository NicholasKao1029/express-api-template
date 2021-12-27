const organisationService = require('../services/organisation.js');
const { getStatusFromError } = require('../errors/status-codes.js');

// TODO: limit query amount
const getAllOrganisation = async (_, res) => {
    let org;

    try {
        org = await organisationService.find();
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(org);
};

const getOrganisation = async (req, res) => {
    const orgId = req.params.orgId;
    let org;

    try {
        org = await organisationService.findById(orgId);
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(org);
};

module.exports = {
    getOrganisation,
    getAllOrganisation
};
