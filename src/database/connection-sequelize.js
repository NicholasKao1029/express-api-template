const { Sequelize } = require('sequelize');
require('dotenv').config();
const getConfig = require('./sequelize-config');
const { isConnected } = require('./utils/utils.js');

const config = getConfig();

const createDB = () => {
    const sequelize = new Sequelize(config);
    return sequelize;
};

const database = createDB();
isConnected(database);

module.exports = database;
