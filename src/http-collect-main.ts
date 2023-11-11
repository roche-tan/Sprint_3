// const url = process.argv[2];
// const url = "http://example.com/";
const http = require("http");
export const fetchData = (url: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
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

        response.on("error", (error: Error) => {
          reject(error);
        });
      })
      .on("error", (error: Error) => {
        // error
        reject(error);
      });
  });
};
