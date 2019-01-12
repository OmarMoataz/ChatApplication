const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3030;

let connections = [], 
    users = [];

app.get('/', (req, res) => res.send('connections: %s', connections.length));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

io.sockets.on('connection', function(socket) {
  console.log("Called");
  connections.push(socket);
  console.log('Connected %s sockets connected', connections.length);

  connections.splice(connections.indexOf(socket), 1);
  console.log('Disconnected: %s sockets disconnected', connections.length);
})

