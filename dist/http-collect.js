"use strict";
const http = require("http");
const bl = require("bl");
const url = process.argv[2];
// const url = "http://example.com/";
http
    .get(url, (response) => {
    response.pipe(bl((error, data) => {
        if (error) {
            return console.error(error);
        }
        data = data.toString(); // set response to string
        console.log(data.length);
        console.log(data);
    }));
    response.on("error", (error) => {
        console.error("Response error: ", error);
    });
})
    .on("error", (error) => {
    // error
    console.error("Request error: ", error);
});
