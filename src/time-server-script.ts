import * as net from "net";

const client = new net.Socket();
const port = 3000; //server's listening port
const serverHost = "127.0.0.1"; // Use localhost for local testing

client.connect(port, serverHost, () => {
  console.log("Connected to server");
});

client.on("data", (data) => {
  console.log("Received: " + data);
  client.destroy(); // kill client after server's response
});

client.on("close", () => {
  console.log("Connection closed");
});
