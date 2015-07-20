var data = function (dataArr) {

  var obj = {};

  var t = dataArr[2];

  var h = dataArr[3];

  var m = dataArr[10];

  obj['t'] = t.substring(0, t.length - 1) + '.' + t.substring(t.length - 1);

  obj['h'] = h.substring(0, h.length - 1) + '.' + h.substring(h.length - 1);

  obj['m'] = m;

  return obj;

};

module.exports = data;


