const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = 3030;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected %s sockets connected', connections.length);

  //Disconnecting
  socket.on('disconnect', (reason) => {
    if(reason === 'transport close')
    {
      socket.disconnect();
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets disconnected', connections.length);
    }
  })

  socket.on('join', (msg) =>  {
    console.log('joining ',  msg);
    socket.join(msg);
  })

  socket.on('send-message', (msg) => {
    console.log(msg.room);
    socket.broadcast.to(msg.room).emit('send-message',msg);
      //socket.broadcast.emit('send-message', msg);
    
    //socket.emit('send-message', msg);
  })
  
})


server.listen(port, () => console.log(`Listening on port ${port}`))
