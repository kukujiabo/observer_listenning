var sequelize = require('../db');

var Sequelize = require('sequelize');

var UserExtInfo = sequelize.define('UserExtInfo', {

  id: Sequelize.INTEGER,

  phone: Sequelize.STRING,

  pic_url: Sequelize.STRING,

  ext_0: Sequelize.STRING,

  ext_1: Sequelize.TEXT,

  ext_2: Sequelize.TEXT,

  user_id: Sequelize.INTEGER,

  created_at: Sequelize.DATE,

  updated_at: Sequelize.DATE

}, {

  timestamps: false,

  tableName: 'user_ext_infos'

});

module.exports = UserExtInfo;
