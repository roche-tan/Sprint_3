/*Create a TCP server in Node.js that listens on a port provided as an argument, sending the current date and time in the "YYYY-MM-DD hh:mm" format to each connecting client, and then closes the connection.*/

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
  let data = getFormatDate();

  socket.write(data + "\n");
  socket.end();
});

server.listen(port, () => {
  let data = getFormatDate();
  console.log(data);
  console.log(`Server listening on port ${port}`);
});
