require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      // password: process.env.DB_PASSWORD || '8214',
      database: process.env.DB_NAME || 'fullstack_db',
    },
    migrations: { directory: './backend/migrations' },
    seeds: { directory: './seeds' },
  },
};