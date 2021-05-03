const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
  io.emit("chat message", "New user joined the chat")

  socket.on("chat message", (message) => {
    socket.broadcast.emit("chat message", message)
  })
})

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})