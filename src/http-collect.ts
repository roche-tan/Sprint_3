const http = require("http");
const bl = require("bl");

const url = process.argv[2];
// const url = "http://example.com/";

http
  .get(url, (response: any) => {
    response.pipe(
      bl((error: Error, data: string) => {
        if (error) {
          return console.error(error);
        }
        data = data.toString(); // set response to string
        console.log(data.length);
        console.log(data);
      })
    );
    response.on("error", (error: Error) => {
      console.error("Response error: ", error);
    });
  })
  .on("error", (error: Error) => {
    // error
    console.error("Request error: ", error);
  });
