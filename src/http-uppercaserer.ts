import { createUppercaseServer } from "./http-uppercaserer-main";

const port = process.argv[2];

const server = createUppercaseServer();

server.listen(port);
