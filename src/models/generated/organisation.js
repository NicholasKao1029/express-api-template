const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'organisation',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
                unique: 'organisations_name_key'
            },
            route_identifier: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
            },
            join_code: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'organisations',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'organisations_name_key',
                    unique: true,
                    fields: [{ name: 'name' }]
                },
                {
                    name: 'organisations_pkey',
                    unique: true,
                    fields: [{ name: 'id' }]
                }
            ]
        }
    );
};
