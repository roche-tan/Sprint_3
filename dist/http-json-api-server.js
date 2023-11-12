"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_json_api_server_main_1 = require("./http-json-api-server-main");
const port = process.argv[2];
const server = (0, http_json_api_server_main_1.createHttpServer)();
server.listen(port);
