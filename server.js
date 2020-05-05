const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static('public/static'));

app.get("/", function(req, res){
  res.redirect('/' + uuidv4());
})

app.get("/:room", function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

let rooms = {};
io.on('connection', function (socket) {
  socket.on('chat', function(d){
    messageData = JSON.parse(d);
    io.to(messageData.room).emit('broadcast', d);
  });
  socket.on('joinroom', function(room) {
      this.join(room);
      if (typeof rooms[room] === "undefined") rooms[room] = {count: 0};
      rooms[room].count += 1;
      io.to(room).emit("new user", rooms[room].count)
  });
});