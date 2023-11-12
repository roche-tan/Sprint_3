"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const http_1 = __importDefault(require("http"));
const fetchData = (urls) => {
    //Save the possition of each url
    let results = new Array(urls.length);
    //Count how many requests have been done. in this case should be 3
    let requestsDone = 0;
    return new Promise((resolve, reject) => {
        urls.forEach((url, index) => {
            //loop to iterate in each url
            http_1.default
                .get(url, (response) => {
                let data = "";
                response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => {
                    results[index] = data; //data is assigned to the index in results
                    requestsDone++; //increment requestsDone when request is done
                    if (requestsDone === urls.length) {
                        // if resquestsDone has the same length as the urls array, it prints each result
                        // results.forEach((result) => console.log(result)); Console will be done in juggling-async
                        resolve(results);
                    }
                });
                response.on("error", (error) => {
                    reject(error);
                });
            })
                .on("error", (error) => {
                console.error("Request error: ", error);
            });
        });
    });
};
exports.fetchData = fetchData;
