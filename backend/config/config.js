require('dotenv').config(); // Ensure dotenv is installed: npm install dotenv

module.exports = {
  development: {
    username: process.env.DB_USER || 'trev',
    password: process.env.DB_PASSWORD || 'admin_alt',
    database: process.env.DB_NAME || 'realestate_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'trev',
    password: process.env.DB_PASSWORD || 'admin_alt',
    database: process.env.DB_NAME_TEST || 'realestate_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necessary for some hosting providers
      },
    },
  },
};
