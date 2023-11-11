// const http = require("http"); If used, type of req & res cannot be used
// const fs = require("fs");
import * as http from "http";
import * as fs from "fs";

const port = process.argv[2];
const file = process.argv[3];

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    //has a function callback that ejecutes everytime the server receives a petition
    // we read the file. Pipe to send the content to res directly
    fs.createReadStream(file).pipe(res);
  }
);

server.listen(port); //starts listening the specific port
