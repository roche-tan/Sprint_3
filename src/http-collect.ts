const http = require("http");

const url = process.argv[2];
// const url = "http://example.com/";

http
  .get(url, (response: any) => {
    let data = "";

    response.on("data", (chunk: string) => {
      data += chunk;
    });

    response.on("end", () => {
      console.log(data.length);
      console.log(data);
    });
  })
  .on("error", (error: Error) => {
    // error
    console.error("Request error: ", error);
  });
