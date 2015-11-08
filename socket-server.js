
commands = [
	"left",
	"right",
	"up",
	"down"
]


var net = require('net');

var server = net.createServer();

connections = []

server.on("connection", function(socket) {
	connections.push(socket)
	// console.log(connections);
	socket.setEncoding("utf8")
	socket.on("data", function (data) {
		console.log(data)
		socket.write('Received:\t' + data + "\n");
	});
	socket.on("close", function () {
		console.log("socket done");
		// pop this socket from connections
		connections.splice(connections.indexOf(socket), 1)
	})
	socket.on("error", function (err) {
		console.log("error:", err);
	})
})

server.on("error", function (err) {
	console.log(err);
})


writeSomething = function () {
	console.log("connections:", connections.length);
	for (var i = 0; i < connections.length; i++) {
		// console.log(connections[i])
		connections[i].write(commands[Math.floor(Math.random() * commands.length)])
	}
}



setInterval(writeSomething, 1000)

server.listen(42124);
