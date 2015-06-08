var data = function (dataString) {

  var array = dataString.split('&');

  var obj = {};

  for (itm in array) {

    var tmp = itm.split('=');

    obj[tmp[0]] = tmp[1];

  }

  return obj;

};

module.exports = data;


