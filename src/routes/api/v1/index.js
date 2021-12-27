const express = require('express');
const V1Router = express.Router();
const OrganisationRouter = require('./organisation');
const database = require('../../../database/connection-sequelize.js');
const dbUtils = require('../../../database/utils/utils.js');

V1Router.use('/organisation', OrganisationRouter);

V1Router.get('/health-check', (_, res) => {
    if (dbUtils.isConnected(database)) {
        res.status(200).send('OK');
    } else {
        res.status(500).send('Health Check failed');
    }
});

module.exports = V1Router;
