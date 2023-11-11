import * as net from "net";
// const net = require("net"); //with this approach not.Socket is not valid
const port = process.argv[2];

const server = net.createServer((socket: net.Socket) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  let data = `${year}-${month}-${day} ${hours}:${minutes}`;

  socket.write(data + "\n");
  socket.end();
});

server.listen(port);
