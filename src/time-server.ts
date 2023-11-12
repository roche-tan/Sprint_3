import * as net from "net";
import { getFormatDate } from "./time-server-main";
// const net = require("net"); //with this approach not.Socket is not valid
const port = process.argv[2];

export const server = net.createServer((socket: net.Socket) => {
  let data = getFormatDate();

  socket.write(data + "\n");
  socket.end();
});

  server.listen(port);

