const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TrackedProduce extends Model {};

TrackedProduce.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        produce_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'produce',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'tracked_produce',
    }
);

module.exports = TrackedProduce;