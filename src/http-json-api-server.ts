import { createHttpServer } from "./http-json-api-server-main";

const port = process.argv[2];

const server = createHttpServer();

server.listen(port);
