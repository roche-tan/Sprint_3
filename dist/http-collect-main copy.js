"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
// const url = process.argv[2];
// const url = "http://example.com/";
const http = require("http");
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        http
            .get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                console.log(data.length);
                console.log(data);
            });
            response.on("error", (error) => {
                reject(error);
            });
        })
            .on("error", (error) => {
            // error
            reject(error);
        });
    });
};
exports.fetchData = fetchData;
