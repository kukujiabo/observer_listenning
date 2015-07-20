var sequelize = require('../db');

var Sequelize = require('sequelize');

var Mechine = sequelize.define('Mechine', {

  id: Sequelize.INTEGER,

  address: Sequelize.TEXT,

  type: Sequelize.INTEGER,

  uid: Sequelize.INTEGER,

  active: Sequelize.INTEGER

}, {

  timestamps: false,

  tableName: 'mechines'

});


module.exports = Mechine;
