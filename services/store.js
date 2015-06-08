var dataService = require('data');

var temperature = require('../models/temperature')

var temperature = require('../models/temperature')

var store = function (data) {

  var infoObj = dataService(data);

  var temperature = infoObj.t;

  var humidity = infoObj.h;

  var mid = infoObj.m;

  var token = infoObj.k;





};
