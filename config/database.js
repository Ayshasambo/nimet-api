const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ force: false });
    })
    .then(() => console.log('Database and tables created!'))
    .catch(err => console.error('Error connecting to the database or syncing tables:', err));

module.exports = sequelize;

