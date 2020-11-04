// Import Sequelize as our ORM
const Sequelize = require('sequelize');

// Load the data from your local .env file
require('dotenv').config();

// Use the JAWSDB variables from Heroku when deployed
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} 
// Use the local database variables we have setup in our .env file
else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, 
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        });
};

// Exports the connection for the rest of the application to use.
module.exports = sequelize;