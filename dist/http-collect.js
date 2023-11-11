"use strict";
const http = require("http");
// const bl = require("bl");
const url = process.argv[2];
// const url = "http://example.com/";
http
    .get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data += chunk;
    });
    response.on("error", (error) => {
        console.error("Response error: ", error);
    });
})
    .on("error", (error) => {
    // error
    console.error("Request error: ", error);
});
