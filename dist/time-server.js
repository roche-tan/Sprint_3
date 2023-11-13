"use strict";
/*Create a TCP (Transmission Control Protocol) server in Node.js that listens on a port provided as an argument, sending the current date and time in the "YYYY-MM-DD hh:mm" format to each connecting client, and then closes the connection.*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.getFormatDate = void 0;
const net_1 = __importDefault(require("net"));
const getFormatDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
exports.getFormatDate = getFormatDate;
const port = process.argv[2];
exports.server = net_1.default.createServer((socket) => {
    //net.createServer method creates a new TCP or IPC server. Called everytime user connects to the server
    let data = (0, exports.getFormatDate)();
    socket.write(data + "\n"); //writes the formatted date and time string to the socket
    socket.end(); //closing connection
});
exports.server.listen(port, () => {
    //listen for the connections on a specific port
    let data = (0, exports.getFormatDate)();
    console.log(data);
    console.log(`Server listening on port ${port}`);
});
