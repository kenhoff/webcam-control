var net = require('net');
var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

commands = [
	"left",
	"right",
	"up",
	"down"
]

var socketServer = net.createServer();

connections = []

socketServer.on("connection", function(socket) {
	connections.push(socket)
	// console.log(connections);
	socket.setEncoding("utf8")
	socket.on("data", function (data) {
		console.log(data)
		// socket.write('Received:\t' + data + "\n");
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

socketServer.on("error", function (err) {
	console.log(err);
})

writeDirection = function (direction) {
	// console.log("connections:", connections.length);
	for (var i = 0; i < connections.length; i++) {
		// console.log(connections[i])
		command = direction
		console.log("Wrote:", command);
		connections[i].write(command)
	}
}

// setInterval(writeDirection, 1000)

socketServer.listen(42124);

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html")
})

app.post("/move", function (req, res) {
	console.log(req.body);
	writeDirection(req.body.direction)
	res.sendStatus(200)
})

app.listen("80")
