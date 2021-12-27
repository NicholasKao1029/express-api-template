const DataTypes = require('sequelize').DataTypes;
const _user = require('./user');
const _organisation = require('./organisation');

function initModels(sequelize) {
    const user = _user(sequelize, DataTypes);
    const organisation = _organisation(sequelize, DataTypes);

    user.belongsTo(organisation_id, { as: 'organisation_id', foreignKey: 'organisation_id' });
    organisation.hasMany(user, { as: 'user', foreignKey: 'organisation_id' });

    return {
        user,
        organisation,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
