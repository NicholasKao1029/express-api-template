const database = require('../../src/database/connection-sequelize.js');
const databaseUtils = require('../../src/database/utils/utils.js');

describe('test sequelize connection to database', () => {
    it('sequelize connection should authenticate', async () => {
        const isConnected = databaseUtils.isConnected(database);
        assert(isConnected);
    });
});
