/*
  This proxy translate TCP to Unix domain sockets 
  For check Unix domain socket use: 
    echo -e "GET /info HTTP/1.1\r\n" | nc -U /var/run/docker.sock
  For check TCP socket use:
    curl -s -XGET http://<PROXY>:8080/info
*/
var net = require('net');

var CONSOLE = true;
var PROXY_PORT = 8000;
var DOCKER_SOCKET = '/var/run/docker.sock';


var server = net.createServer(function (socket) {
    socket.on('data', function (msg) {
        print('  ** START **');
        print('<< From client to proxy ', msg.toString());
        
        var serviceSocket = new net.Socket();
        
        serviceSocket.connect(DOCKER_SOCKET, function () {
            print('>> From proxy to remote', msg.toString());
            
            serviceSocket.write(msg);
        });
        
        serviceSocket.on("data", function (data) {
            print('<< From remote to proxy', data.toString());
            
            socket.write(data);
            
            print('>> From proxy to client', data.toString());
        });
    });
});

var print = function(msg, obj) {
    if(CONSOLE) {
        console.log(msg, obj);
    }
};

server.listen(PROXY_PORT);

print("TCP server accepting connection on port: " + PROXY_PORT);
