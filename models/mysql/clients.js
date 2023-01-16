const { sequelize } = require('../../config/mysql');
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        tel: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Users;