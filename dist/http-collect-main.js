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
