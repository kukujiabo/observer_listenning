var sequelize = require('../db');

var Sequelize = require('sequelize');

var Humidity = sequelize.define('Humidity', {

  id: Sequelize.INTEGER,

  data: Sequelize.DOUBLE(8 ,2),

  user_id: Sequelize.INTEGER,

  mechine_id: Sequelize.INTEGER,

  type: Sequelize.INTEGER,

  is_normal: Sequelize.INTEGER,

  seq: Sequelize.STRING,

  created_at: Sequelize.DATE,

  updated_at: Sequelize.DATE

}, {

  timestamps: false,

  tableName: 'humidities'

});

module.exports = Humidity;
