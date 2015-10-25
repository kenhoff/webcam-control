var express = require('express');

app = express();

app.get("/", function (req, res) {
	res.send("Hello!")
})

app.listen(3000 || process.env.PORT, function () {
	console.log("Listening...");
})
