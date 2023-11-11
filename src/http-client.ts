/*Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).*/

import http from 'http'
const url: string = process.argv[2];
// const url = "http://example.com/";


http
  .get(url, (response: any) => {
    response.setEncoding("utf8"); //set response to string
    response.on("data", (chunk: string) => {
      //listen for data events and print them in parts (chunk). Not recomended to manage large data as it is processed in "chunks"
      console.log(chunk);
    });
    response.on("error", (error: Error) => {
      //listen error events
      console.error(error);
    });
  })
  .on("error", (error: Error) => {
    //handle network errors
    console.error(error);
  });
