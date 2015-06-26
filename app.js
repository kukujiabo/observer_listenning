var net = require('net');

var db = require('mysql');

var validate = require('./services/validate');

var dataService = require('./services/data');

var store = require('./services/store');

var port = '5959';

/*
 * Create socket server.
 */
net.createServer(function (socket) {

  console.log('Socket server listen at port: ' + port + '.' );

  socket.on('data', function (data) {

    data = data.toString();

    console.log(data);

    /*
     * Check data formation.
     */
    var info = validate(data);

    if (!info) {

      socket.write('Invalid data.');

    } else {

      /*
       * Data acceptable.
       */
      console.log(info);

      store(socket, info);

      socket.write('success.');

    }

    socket.write(data + ' arrived.');

  });

  socket.on('end', function (data) {

    console.log('end');

    socket.write('end.');

  });

  socket.on('close', function (data) {

    console.log('Server close.');

    socket.write('Server closed.');

  });

  socket.on('error', function (error) {

    console.log(error);

  });

}).listen(port);

console.log("listen at port: " + port);
