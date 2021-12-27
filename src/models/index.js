const { initModels } = require('./generated/init-models.js');

const database = require('../database/connection-sequelize.js');

const models = ({
    user,
    organisation,
} = initModels(database));

module.exports = models;
