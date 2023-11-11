"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_main_1 = require("./http-client-main");
const url = process.argv[2];
(0, http_client_main_1.fetchData)(url)
    .then((chunks) => {
    chunks.forEach((chunk) => console.log(chunk));
})
    .catch((error) => {
    console.error(error);
});
