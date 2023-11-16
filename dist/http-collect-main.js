"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
// const url = process.argv[2];
// const url = "http://example.com/";
// const http = require("http");
const http_1 = __importDefault(require("http"));
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        http_1.default
            .get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                //this is triggered when a chunkk of data is received
                data += chunk;
            });
            response.on("end", () => {
                //is triggered when the entire response has been received.
                console.log(data.length);
                console.log(data);
                resolve(data);
            });
            response.on("error", (error) => {
                //If an error occurs during the response, reject of the Promise is called with the error.
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
