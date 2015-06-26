var sequelize = require('../db');

var Sequelize = require('sequelize');

var UserConfig = sequelize.define('UserConfig', {

  id: Sequelize.INTEGER,

  setting_id: Sequelize.INTEGER,

  setting_value: Sequelize.INTEGER,

  active: Sequelize.INTEGER,

  comment: Sequelize.TEXT,

  setting_name: Sequelize.STRING

}, {

  timestamps: false,

  tableName: 'v_user_setting_relat'

});

module.exports = UserConfig;
