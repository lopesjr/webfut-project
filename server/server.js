var express = require("express");
var socket = require("socket.io");

var clients = 0;

var app = express();
var server = app.listen(4000, function () {
  console.log("listening to requires on port 4000");
});

app.use(express.static("../public"));

var io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);
  clients++;
  io.sockets.emit("broadcast", {
    description: clients + " clients connected!",
  });
  socket.on("disconnect", function () {
    clients--;
    io.sockets.emit("broadcast", {
      description: clients + " clients connected!",
    });
  });
});
