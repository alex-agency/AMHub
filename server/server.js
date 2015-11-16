/*
  This proxy translate TCP to Unix domain sockets 
  For check Unix domain socket use: 
    echo -e "GET /info HTTP/1.1\r\n" | nc -U /var/run/docker.sock
  For check TCP socket use:
    curl -s -XGET http://<PROXY_HOST>:<PROXY_PORT>/info
*/
var net = require('net');

var PROXY_PORT = 8000;
var DOCKER_SOCKET = '/docker.sock';

// create tcp server
net.createServer(function (socket) {
  // get msg request from tcp client
  socket.on('data', function (msg) {
    // define CORS header
    var headerCORS = "\r\nAccess-Control-Allow-Headers: Content-Type" +
      "\r\nAccess-Control-Allow-Methods: GET, POST, DELETE" +
      "\r\nAccess-Control-Allow-Origin: *";
    // resolve CORS prefligth request
    if(msg.toString().indexOf("OPTIONS") === 0) {
      socket.end("HTTP/1.1 200 OK" +
        headerCORS +
        "\r\nAccess-Control-Max-Age: 1728000");
      return;
    }
    // create connection to unix server
    var serviceSocket = new net.Socket();
    serviceSocket.connect(DOCKER_SOCKET, function () {
      // when connection established write msg responce to unix server
      serviceSocket.write(msg);
    });
    // get data request from unix server
    serviceSocket.on('data', function (data) {
      // modify header to enable CORS
      var separator = '\r\n\r\n';
      headerCORS += separator;
      data = data.toString().replace(separator, headerCORS);
      // write tcp response
      socket.write(data.toString());
    });
    // error event
    serviceSocket.on('error', function (err) {
      console.log('Docker server error: ');
      console.log(err.stack);
      socket.end();
    });
    // close connection event
    serviceSocket.on('end', function (end) {
      console.log('Docker server disconnected');
      socket.end();
    });
  });
  // error event
  socket.on('error', function (err) {
    console.log('TCP proxy error: ');
    console.log(err.stack);
    socket.end();
  });
  // close connection event
  socket.on('end', function (end) {
    console.log('TCP proxy disconnected');
  });
}).listen(PROXY_PORT, function () {
  console.log('TCP proxy listening at %s port', PROXY_PORT);
});

/*
  Web server 
*/
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// json api
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
// config
var fs = require('fs')
var configFile = 'server/config.json'
var config = JSON.parse(fs.readFileSync(configFile));
router.route('/config')
  .get(function (req, res) {
    res.json(config);
  })
  .post(function (req, res) {
    config = req.body;
    fs.writeFile(configFile, JSON.stringify(config, null, 4), function (err) {
      if (err) 
        res.send(err);
      res.json("Config successfully saved.");
    });
  });
router.route('/config/:param')
  .get(function (req, res) {
    res.json(config[req.params.param]);
  });
// system variables
router.route('/env')
  .get(function (req, res) {
    res.json(process.env);
  });
router.route('/env/:param')
  .get(function (req, res) {
    res.json(process.env[req.params.param]);
  });
app.use('/api', router);

// redirect everything to index.html
var path = require('path');
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(80, function () {
  console.log('Web server listening at http://%s:%s', 
    server.address().address, server.address().port);
});

process.on('uncaughtException', function(err) {
    log("uncaughtException");
    console.error(err.stack);
    process.exit();
});
