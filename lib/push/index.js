var push = require('./push');

var signKey = require('./signKey');

var singleDataPush = function (uid, cid, temp, humi, time) {
  //透传数据
  var description = "{ temp: '" + temp + "', humi: '" + humi + "', time: '" + time + "' }";

  //post参数
  var post_data = {

    channel_id: '3927708139764673995',

    msg_type: 0,

    msg: description

  };

  //路径
  var path = 'single_path';

  //发送推送请求
  push(path, 'POST', post_data, function (e, data) {

    if (e) {

      console.log(e);

      return;

    }

    console.log(data);

  });

};

module.exports = {

  singleDataPush: singleDataPush,

};
