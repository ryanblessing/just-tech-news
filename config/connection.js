//imports the sequelize construtor from node library
const Sequelize = require('sequelize');

//download dotenv from NPM and run this to set up environment variables---ADD .ENV file to git ignore!!
require('dotenv').config();

//create a connection to our database, and pass in your mysql info
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;