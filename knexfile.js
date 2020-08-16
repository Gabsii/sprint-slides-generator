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
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
