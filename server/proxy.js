/*
  This proxy translate TCP to Unix domain sockets 
  For check Unix domain socket use: 
    echo -e "GET /info HTTP/1.1\r\n" | nc -U /var/run/docker.sock
  For check TCP socket use:
    curl -s -XGET http://<PROXY>:8080/info
*/
var net = require('net');

var PROXY_PORT = 8000;
var DOCKER_SOCKET = '/var/run/docker.sock';

// create tcp server
net.createServer(function (socket) {
    // get msg request from tcp client
    socket.on('data', function (msg) {
        // create connection to unix server
        var serviceSocket = new net.Socket();
        serviceSocket.connect(DOCKER_SOCKET, function () {
            // when connection established write msg responce to unix server
            serviceSocket.write(msg);
        });
        // get data request from unix server
        serviceSocket.on('data', function (data) {
            // modify header to enable CORS
            var cors_enable = '\r\nAccess-Control-Allow-Methods: POST, GET';
            cors_enable += '\r\nAccess-Control-Allow-Origin: *';
            var separator = '\r\n\r\n';
            cors_enable += separator;
            data = data.toString().replace(separator, cors_enable);
            // write tcp response
            socket.write(data.toString());
        });
    });
}).listen(PROXY_PORT);

console.log("TCP server accepting connection on port: " + PROXY_PORT);
