var sequelize = require('../db');

var Sequelize = require('sequelize');

var userSetting = sequelize.define('UserSetting', {

  id: Sequelize.INTEGER,

  setting_name: Sequelize.STRING,

  level: Sequelize.INTEGER,

  active: Sequelize.INTEGER,

  comment: Sequelize.TEXT

}, {

  timestamps: false,

  tableName: 'user_settings'

});

module.exports = userSetting;
