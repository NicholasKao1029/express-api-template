const userService = require('../services/user.js');
const { getStatusFromError } = require('../errors/status-codes.js');

const get = async (req, res) => {
    const userId = req.params.userId;
    const orgId = req.params.orgId;
    let userList;

    try {
        console.log(userId, orgId);
        userList = await userService.findByIdAndOrgId(
            orgId,
            userId
        );
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(userList);
};

const getAll = async (req, res) => {
    const orgId = req.params.orgId;
    let userList;

    try {
        userList = await userService.findByOrganisationId(
            orgId
        );
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(userList);
};

const patch = async (req, res) => {
    const userId = req.params.userId;
    const orgId = req.params.orgId;
    const updateObj = req.body;

    let user;

    try {
        user = await userService.update(
            orgId,
            userId,
            updateObj
        );
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).send(user);
};

const post = async (req, res) => {
    const createObj = req.body;
    const userId = req.params.orgId;
    let userList;

    try {
        userList = await userService.create(
            userId,
            createObj
        );
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(userList);
};

const deleteHandler = async (req, res) => {
    const userId = req.params.orgId;
    const id = req.params.userId;
    let userList;

    try {
        userList = await userService.deleteOmitSlice(
            userId,
            id
        );
    } catch (e) {
        const status = getStatusFromError(e);
        res.status(status).send(e.message);
    }

    res.status(200).json(userList);
};

module.exports = {
    getAll,
    get,
    post,
    deleteHandler,
    patch
};
