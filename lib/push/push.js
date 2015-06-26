//发送http请求
var http = require('http');


var rest = require('restler');


var url = require('url');


var querystring = require('querystring');

//读取配置
var config = require('./config.json');

//加密函数
var signKey = require('./signKey');

//api key
var api_key = config.api_key;

//secret key
var secret_key = config.secret_key;

/**
 * @param string path, 请求路径
 * @param string method, http动词
 * @param string post_data, post表单内容
 * @param function callback, 回调函数
 *
 */
var push = function (path, method, post_data, callback) {

  //基本参数
  var base_query = querystring.stringify({

    apikey: config.api_key,

    timestamp: Math.round(new Date().getTime()/1000),

    expires: config.expires,

    device_type: 3,

    user_id: config.user_id

  });

  var queryUrl = config.host + config.base_path + config[path] + '?' + base_query;

  //http 参数
  var reqParams = url.parse(queryUrl);

  reqParams.method = 'post';

  //生成签名
  var sk = signKey(reqParams, post_data, config.secret_key);

  post_data.sign = sk;

  rest.post(queryUrl, {

    data: post_data,

  }).on('complete', function (data, response) {

    console.log(data);

  });

};

module.exports = push;
