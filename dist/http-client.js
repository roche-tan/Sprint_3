"use strict";
/*Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url = process.argv[2];
// const url = "http://example.com/";
http_1.default
    .get(url, (response) => {
    response.setEncoding("utf8"); //set response to string
    response.on("data", (chunk) => {
        //listen for data events and print them in parts (chunk). Not recomended to manage large data as it is processed in "chunks"
        console.log(chunk);
    });
    response.on("error", (error) => {
        //listen error events
        console.error(error);
    });
})
    .on("error", (error) => {
    //handle network errors
    console.error(error);
});
