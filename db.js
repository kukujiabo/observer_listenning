var config = require('./config');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.user, config.password, {

  host: config.host,

  dialects: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

module.exports = sequelize;
