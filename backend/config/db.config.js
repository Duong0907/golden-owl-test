require("dotenv").config();

const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {},
    port: process.env.DB_PORT,
    SSL_MODE: process.env.SSL_MODE,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

module.exports = dbConfig;
