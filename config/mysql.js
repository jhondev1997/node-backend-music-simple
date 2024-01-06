const { Sequelize } = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        host,
        dialect: "mysql"
    }
)

const dbConnectMySql = async()=>{
    console.log("Entro al async")
    try {
        await sequelize.authenticate();
        console.log('MYSQL Conexión correcta');
    } catch (e) {
        console.log('MYSQL Error de conexion');
    };
};

module.exports = { sequelize, dbConnectMySql};