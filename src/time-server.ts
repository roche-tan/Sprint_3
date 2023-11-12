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
  console.log(`Server listening on port ${port}`);
});
