// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'sprint-slides',
      user: 'root',
      password: 'root',
    },
  },
  production: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
