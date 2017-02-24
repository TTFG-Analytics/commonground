// Update with your config settings.

module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: 'cg_db',
      user:     'commonground',
      password: 'commonground123'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds/mockTestData'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'cg_db',
      user:     'commonground',
      password: 'commonground123'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'cg_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'cg_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
