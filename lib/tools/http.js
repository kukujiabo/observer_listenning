var http = require('http');

var qs = require('querystring');

var request = function (hostname, path, data, query) {

  var content = qs.stringify(data);

  console.log(content);

  var options = {

    hostname: hostname,

    path: '/rest/3.0/push/single_device',

    method: 'POST',

    headers: {

      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

      'Content-Length': content.length,

      'User-Agent': 'BCCS_SDK/3.0 (Darwin; Darwin Kernel Version 14.0.0: Fri Sep 19 00:26:44 PDT 2014; root:xnu-2782.1.97~2/RELEASE_X86_64; x86_64) node/v0.12.7 (node server)'

    }

  };

  var req = http.request(options, function (res) {

    console.log('STATUS: ' + res.statusCode);

    console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (chunk) {

      console.log('BODY: ' + chunk);

    });

  });
  
  req.on('error', function (e) {
    
    console.log('problem with request: ' + e.message);

  });

  req.write(content);

  req.end();

};

module.exports = request;
