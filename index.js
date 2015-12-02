var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // Broadcast a message to connected users when someone connects or disconnects.
  socket.broadcast.emit('chat message', 'A user has connected.');
  socket.on('disconnect', function(){
    socket.broadcast.emit('chat message', 'A user has disconnected.');
  });
  
  // Don't send the same message to the user that sent it themself.
  // Instead, append the message directly as soon as he / she presses enter.
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  
});

//http.listen(3000, function(){
//console.log('listening on *:3000');
//});


var server = http.listen(port, function() {
console.log('listening on *:' + port);
});