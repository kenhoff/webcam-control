var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html")
})

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on("message", function (data) {
		console.log("message:", data);
		socket.send("i got your message")
	})
});

http.listen(process.env.PORT || 3000, function() {
	console.log("Listening...");
})
