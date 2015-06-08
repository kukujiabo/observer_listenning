var sequelize = require('../db');

var Sequelize = require('sequelize');

var Humidity = sequelize.define('Humidity', {

  id: Sequelize.INTEGER,

  data: Sequelize.DOUBLE(8 ,2),

  type: Sequelize.INTEGER,

  is_normal: Sequelize.INTEGER


}, {

  timestamps: false,

  tableName: 'humidities'

});

module.exports = Humidity;
