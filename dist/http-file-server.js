"use strict";
// const http = require("http"); If used, type of req & res cannot be used
Object.defineProperty(exports, "__esModule", { value: true });
const http_file_server_main_1 = require("./http-file-server-main");
const port = process.argv[2];
const file = process.argv[3];
const server = (0, http_file_server_main_1.createFileServer)(file);
server.listen(port); //starts listening the specific port
