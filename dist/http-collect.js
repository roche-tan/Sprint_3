"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_collect_main_1 = require("./http-collect-main");
const url = process.argv[2];
(0, http_collect_main_1.fetchData)(url)
    // Data is being printed directly in fetch data. so there is no need to do anything else
    .catch((error) => {
    console.log(error);
});
