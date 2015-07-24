//发送http请求
var http = require('../tools/http');

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
  
  var base_body = {
  
    apikey: config.api_key,

    timestamp: Math.round(new Date().getTime()/1000),

    expires: config.expires,

    device_type: 3,

    user_id: config.user_id
  
  };

  //基本参数
  var base_query = querystring.stringify(base_body);

  //请求url
  var queryUrl = config.host + config.base_path + config[path] + '?' + base_query;

  //http 参数
  var reqParams = url.parse(queryUrl);

  reqParams.method = 'post';

  post_data.expires = base_body.expires;

  post_data.device_type = base_body.device_type;

  post_data.user_id = base_body.user_id;

  post_data.timestamp = base_body.timestamp;

  post_data.apikey = base_body.apikey;
  
  //生成签名
  var sk = signKey(reqParams, post_data, config.secret_key);

  post_data.sign = sk;

  http(config.hostname, config.base_path + config[path], post_data, '');

  /*
  rest.request(queryUrl, {

    data: post_data,

    encoding: 'utf8',

    headers: { 
      
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    
      'User-Agent': 'restler for node.'
    
    }
  
  }).on('complete', function (result, response) {
  
    console.log(result);
  
  });
  */

};

module.exports = push;
