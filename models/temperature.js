var sequelize = require('../db');

var Sequelize = require('sequelize');

var Temperature = sequelize.define('Temperature', {

  id: Sequelize.INTEGER,

  data: Sequelize.DOUBLE(8, 2),

  type: Sequelize.INTEGER,

  is_normal: Sequelize.INTEGER

}, {

  timestamps: false,

  tableName: 'temperatures'

});

module.exports = Temperature;
