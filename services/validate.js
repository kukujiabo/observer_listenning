var validate = function (str) {

  if (str.indexOf('AOSONG', 0) == 0) {

    return str.split('+');

  }

  return false;

};

module.exports = validate;
