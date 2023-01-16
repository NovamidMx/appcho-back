const { Sequelize } = require("sequelize");

const NODE_ENV = process.env.NODE_ENV;

const database = (NODE_ENV === 'test') ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
        database,
        username,
        password,
        {
            host,
            dialect: "mysql"
        }
    );

const dbConnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log("MYSQL conexion correcta");
    } catch (e) {
        console.log("MYSQL Error de conexión: ", e);
    }
};

module.exports = {sequelize, dbConnectMysql};