// const url = process.argv[2];
// const url = "http://example.com/";
// const http = require("http");
import http from "http";

export const fetchData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response: http.IncomingMessage) => {
        let data = "";

        response.on("data", (chunk: string) => {
          //this is triggered when a chunkk of data is received
          data += chunk;
        });

        response.on("end", () => {
          //is triggered when the entire response has been received.
          console.log(data.length);
          console.log(data);
          resolve(data);
        });

        response.on("error", (error: Error) => {
          //If an error occurs during the response, reject of the Promise is called with the error.
          reject(error);
        });
      })
      .on("error", (error: Error) => {
        // error
        reject(error);
      });
  });
};
