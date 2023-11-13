/*Create a TCP (Transmission Control Protocol) server in Node.js that listens on a port provided as an argument, sending the current date and time in the "YYYY-MM-DD hh:mm" format to each connecting client, and then closes the connection.*/

import net from "net";

export const getFormatDate = (): string => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const port = process.argv[2];

export const server = net.createServer((socket: net.Socket) => {
  //net.createServer method creates a new TCP or IPC server. Called everytime user connects to the server
  let data = getFormatDate();

  socket.write(data + "\n"); //writes the formatted date and time string to the socket
  socket.end(); //closing connection
});

server.listen(port, () => {
  //listen for the connections on a specific port
  let data = getFormatDate();
  console.log(data);
  console.log(`Server listening on port ${port}`);
});
