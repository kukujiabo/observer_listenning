var data = function (dataString) {

  var array = dataString.split('&');

  var obj = {};

  var length = array.length;

  for (var i = 0; i < length; i++) {

    var tmp = array[i].split('=');

    obj[tmp[0]] = tmp[1];

  }

  return obj;

};

module.exports = data;


