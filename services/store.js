var dataService = require('./data');

var Temperature = require('../models/temperature')

var Humidity = require('../models/humidity')

var Mechine = require('../models/mechine');

var User = require('../models/user');

var UserSetting = require('../models/userSetting');

var UserConfig = require('../models/userConfig');

/*
 * 存储数据
 *
 */
var store = function (socket, data) {

  var infoObj = dataService(data);

  var temperature = infoObj.t;

  var humidity = infoObj.h;

  var tmid = infoObj.tm;

  var hmid = infoObj.hm;

  var token = infoObj.k;

  Mechine.findById(hmid).then(function (mec) {

    User.findById(mec.uid).then(function (user) {

      //if (token == user.remember_token) {

      if (true) {
        /*
         * 获取用户自定义的配置信息
         */
        UserConfig.findAll({}).then(function (configs) {

          var confs = {};

          for (config in configs) {

            confs[config.setting_name] = config;

          }

          storeTemp(temperature, user, tmid, confs);

          storeHumi(humidity, user, hmid, confs);

        });

      } else {

        socket.write('token err.');

      }

    });

  });

};

var storeTemp = function (data, user, mid, configs) {

  var h_tem = configs.t_warning_high;

  var l_tem = configs.t_warning_low;

  var type_id = 0;

  if (data >= h_tem) {

    type_id = 1;

  } else if (data <= l_tem) {

    type_id = 2;

  }

  console.log(user.id);

  Temperature.create({

    data: data,

    type_id: type_id,

    user_id: user.id,

    mechine_id: mid,

    type_id: 0

  });

};

var storeHumi = function (data, user, mid, configs) {

  var h_hum = configs.h_warning_high;

  var l_hum = configs.h_warning_low;

  var type_id = 0;

  if (data >= h_hum) {

    type_id = 1;

  } else if (data <= l_hum) {

    type_id = 2;

  }

  Humidity.create({

    data: data,

    type_id: type_id,

    user_id: user.id,

    mechine_id: mid,

    type_id: 1

  });

};

module.exports = store;
