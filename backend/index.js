const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
require('dotenv').config();

const port = process.env.PORT;
require('./sockets').initSockets(server);


server.listen(port, () => console.log(`Listening on port ${port}`));
