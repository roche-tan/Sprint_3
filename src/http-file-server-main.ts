// const http = require("http"); //If used, type of req & res cannot be used
// const fs = require("fs");
import * as http from "http";
import * as fs from "fs";

export const createFileServer = (file: string) => {
  return http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      //has a function callback that ejecutes everytime the server receives a petition
      // we read the file. Pipe to send the content to res directly
      fs.createReadStream(file).pipe(res);
    }
  );
};
