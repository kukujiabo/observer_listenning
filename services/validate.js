var validate = function (str) {

  if (str.indexOf('info') == 0) {

    return str.split('#')[1];

  }

  return false;

};

module.exports = validate;
