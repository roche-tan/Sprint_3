"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_uppercaserer_main_1 = require("./http-uppercaserer-main");
const port = process.argv[2];
const server = (0, http_uppercaserer_main_1.createUppercaseServer)();
server.listen(port);
