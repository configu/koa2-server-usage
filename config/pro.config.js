module.exports = {
  port: 3008,
  redis: {
    port: 6379,          // Redis port
    host: 'xx.xx.xx.xx',   // Redis host
    password: 'xxx',
  },
  sso: {

  },
  mongodb: {
    url: 'mongodb://xx.xx.xx.xx:27017/dbName',
  },
  mysql: {
    user: 'root',
    password: 'xxx!',
    database: 'test',
    options: {
      host: 'xx.xx.xx.xx',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true
      },
      // SQLite only
      storage: 'path/to/database.sqlite',
      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      operatorsAliases: false
    }
  },
  static: {
    logo: 'https://assets-cdn.github.com/favicon.ico'
  }
};
