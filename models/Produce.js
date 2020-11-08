const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Produce extends Model {};

Produce.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        water_amount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        water_frequency: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'produce'
    }
);

module.exports = Produce;