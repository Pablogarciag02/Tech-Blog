const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "heroku_5f65cf7c7ca3600",
        region: "US-East",
        dialect: "mysql",
        port: 3306,
    }
);

module.exports = sequelize;