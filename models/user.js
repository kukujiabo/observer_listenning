var sequelize = require('../db');

var Sequelize = require('sequelize');

var User = sequelize.define('User', {

  id: Sequelize.INTEGER,

  name: Sequelize.STRING,

  email: Sequelize.STRING,

  password: Sequelize.STRING,

  remember_token: Sequelize.STRING

}, {

  timestamps: false,

  tableName: 'users'

});

module.exports = User;
