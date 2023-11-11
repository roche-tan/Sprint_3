"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const http_1 = __importDefault(require("http"));
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        let dataChunks = [];
        http_1.default
            .get(url, (response) => {
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
                dataChunks.push(chunk);
            });
            response.on("end", () => {
                resolve(dataChunks);
            });
            response.on("error", (error) => {
                reject(error);
            });
        })
            .on("error", (error) => {
            reject(error);
        });
    });
};
exports.fetchData = fetchData;
