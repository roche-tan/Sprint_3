// const http = require("http"); If used, type of req & res cannot be used

import { createFileServer } from "./http-file-server-main";

const port = process.argv[2];
const file = process.argv[3];

const server = createFileServer(file);

server.listen(port); //starts listening the specific port
