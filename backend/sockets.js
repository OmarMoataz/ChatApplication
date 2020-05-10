const socketIO = require("socket.io");

module.exports = {
  initSockets(server) {
    users = [];
    connections = [];
    
    const io = socketIO(server);

    io.sockets.on("connection", function (socket) {
      connections.push(socket);
      console.log(
        `1 new socket connected, ${connections.length} socket(s) connected.`
      );

      //Disconnecting
      socket.on("disconnect", (reason) => {
        if (reason === "transport close") {
          socket.disconnect();
          connections.splice(connections.indexOf(socket), 1);
          console.log(
            `1 socket disconnected, ${connections.length} socket(s) remaning.`
          );
        }
      });

      socket.on("join", (msg) => {
        socket.join(msg);
      });

      socket.on("send-message", (msg) => {
        console.log(msg.room);
        socket.broadcast.to(msg.room).emit("send-message", msg);
      });
    });
  },
};
