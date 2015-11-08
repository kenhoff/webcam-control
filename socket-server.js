/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp
server, but for some reason omit a client connecting to it.  I added an
example at the bottom.
Save the following server in example.js:
*/

var net = require('net');

var server = net.createServer();

server.on("connection", function(socket) {
	console.log("someone connected!");
	socket.pipe(socket)
})

server.listen(42124);
