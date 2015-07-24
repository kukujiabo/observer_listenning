var sequelize = require('../db');

var Sequelize = require('sequelize');

var Temperature = sequelize.define('Temperature', {

  id: Sequelize.INTEGER,

  data: Sequelize.FLOAT(8, 2),

  user_id: Sequelize.INTEGER,

  mechine_id: Sequelize.INTEGER,

  type: Sequelize.INTEGER,

  is_normal: Sequelize.INTEGER,

  seq: Sequelize.STRING,

  created_at: Sequelize.DATE,

  updated_at: Sequelize.DATE

}, {

  timestamps: false,

  tableName: 'temperatures'

});

module.exports = Temperature;
