const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            organisation_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'organisation',
                    key: 'id'
                }
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'user',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'user_pkey',
                    unique: true,
                    fields: [{ name: 'id' }]
                }
            ]
        }
    );
};
