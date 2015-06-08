var net = require('net');

var db = require('mysql');

var validate = require('./services/validate');

var dataService = require('./services/data');

var store = require('./services/store');

var port = '5959';

net.createServer(function (socket) {

  console.log('Socket server listen at port: ' + port + '.' );

  socket.on('data', function (data) {

    var info = validate(data);

    if (!info) {

      socket.write('Invalid data.');

    } else {

      store(info);

      socket.write('success.');

    }

  });

  socket.on('end', function (data) {


  });

  socket.on('close', function (data) {

    socket.write('Server closed.');

  });

}).listen(port);
