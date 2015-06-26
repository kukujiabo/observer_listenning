var crypto = require('crypto');

var querystring = require('querystring');

var fullEncodeURIComponent = function (str) {

  var rv = encodeURIComponent(str).replace(/[!'()*~]/g, function (c) {

    return '%' + c.charCodeAt(0).toString(16).toUpperCase();

  });

  return rv.replace(/\%20/g, '+');

};

/**
 * 生成请求签名
 *
 * @param {object} reqParams, 由url.parse解析出来的对象内容，描述请求的位置和url及参数等信息对象
 * @param {object} postParams post表单内容
 * @param {string} secretKey 开发者中心的key
 * @return {string} 签名值
 *
 */
var signKey = function (reqParams, postParams, secretKey) {

  var baseKey = "";

  var method = reqParams.method.toUpperCase();

  var baseurl = 'http://' + reqParams.host + reqParams.pathname;

  var query = reqParams.query;

  var param = {};

  var paramStr = '';

  if (query) {

    query = querystring.parse(query);

    for (var key in query) {

      param[key] = query[key];

    }

  }

  if (postParams) {

    for (var key in postParams) {

      param[key] = postParams[key];

    }

  }

  var keys = Object.keys(param).sort();

  keys.forEach(function (key) {

    paramStr += key + '=' + param[key];

  });

  baseKey =  method + baseurl + paramStr + secretKey;

  baseKey = fullEncodeURIComponent(baseKey);

  var md5 = crypto.createHash('md5');

  md5.update(baseKey);

  var sign = md5.digest('hex');

  return sign;

};

module.exports = signKey;
