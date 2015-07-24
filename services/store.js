var dataService = require('./data');

var Temperature = require('../models/temperature')

var Humidity = require('../models/humidity')

var Mechine = require('../models/mechine');

var User = require('../models/user');

var UserSetting = require('../models/userSetting');

var UserConfig = require('../models/userConfig');

var UserExtInfo = require('../models/userExtInfo');

var crypto = require('crypto');

var Events = require('events');

var PushManager = require('../lib/push');

var t_data_ready = false;

var h_data_ready = false;

var pushEvent = new Events.EventEmitter();

/*
 * 发起推送事件
 */
var dataPush = function () {

  if (t_data_ready && h_data_ready) {

    t_data_ready = h_data_ready = false;

    var tdata = dataPush.tmp.data;

    var hdata = dataPush.humi.data;

    var datetime = dataPush.datetime;

    var uid = dataPush.user.id;

    var cid = dataPush.userEx.ext_0;

    PushManager.singleDataPush(uid, cid, tdata, hdata, datetime);

  }

}

/*
 * 存储数据
 */
var store = function (socket, data) {

  var md5 = crypto.createHash('md5');

  var date = new Date();

  var datetime = date.getTime();

  dataPush.datetime = datetime;

  //Parser data.
  var infoObj = dataService(data);

  var temperature = infoObj.t;

  var humidity = infoObj.h;

  var code = infoObj.m;

  var mid = undefined;

  md5.update(infoObj.m + infoObj.k + datetime);

  var seq = md5.digest('hex');

  //Register temperature save ready.
  pushEvent.on('t_store_ready', dataPush);

  //Register humidity save ready.
  pushEvent.on('h_store_ready', dataPush);

  Mechine.findOne({where : { mechine_code: code }}).then(function (mec) {

    mid = mec.id;

    User.findOne({where : { id: mec.uid }}).then(function (user) {

      dataPush.user = user;

      if (true) {
        /*
         * 获取用户自定义的配置信息
         */
        UserConfig.findAll().then(function (configs) {

          var confs = {};

          for (config in configs) {

            confs[config.setting_name] = config;

          }

          /*
           * 获取用户信息
           */
          UserExtInfo.findOne({ where: { user_id: user.id }}).then(function(userEx) {

            dataPush.userEx = userEx;

            storeTemp(temperature, seq, user, mec.id, datetime, confs);

            storeHumi(humidity, seq, user, mec.id, datetime, confs);

          });

        });

      } else {

        socket.write('token err.');

      }

    });

  });

};

/*
 * Store temperature.
 */
var storeTemp = function (data, seq, user, mid, datetime, configs) {

  var h_tem = configs.t_warning_high;

  var l_tem = configs.t_warning_low;

  var type_id = 0;

  if (data >= h_tem) {

    type_id = 1;

  } else if (data <= l_tem) {

    type_id = 2;

  }

  console.log(user);

  Temperature.create({

    data: data,

    seq: seq,

    type_id: type_id,

    user_id: user.id,

    mechine_id: mid,

    type_id: 0,

    created_at: datetime,

    updated_at: datetime

  }).then(function (tmp) {

    t_data_ready = true;

    dataPush.tmp = tmp;

    pushEvent.emit('t_store_ready');

  });

};

/*
 * Store humidity.
 */
var storeHumi = function (data, seq, user, mid, datetime, configs) {

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

    seq: seq,

    type_id: type_id,

    user_id: user.id,

    mechine_id: mid,

    type_id: 1,

    created_at: datetime,

    updated_at: datetime

  }).then(function (humi) {

    h_data_ready = true;

    dataPush.humi = humi;

    pushEvent.emit('h_store_ready');

  });

};

module.exports = store;
