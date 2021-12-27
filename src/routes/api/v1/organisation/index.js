const express = require('express');
const OrganisationRouter = express.Router({ mergeParams: true });
const OrganisationController = require('../../../../controllers/organisation.js');
const userRouter = require('./user/index.js');

OrganisationRouter.get('', OrganisationController.getAllOrganisation);
OrganisationRouter.get('/:orgId', OrganisationController.getOrganisation);
OrganisationRouter.use('/:orgId/user', userRouter);

module.exports = OrganisationRouter;
