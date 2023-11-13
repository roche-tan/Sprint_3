import http from "http";

export const fetchData = (url: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    let dataChunks: string[] = [];

    http
      .get(url, (response) => {
        response.setEncoding("utf8"); //handles data to string
        response.on("data", (chunk: string) => {
          dataChunks.push(chunk); //chunk is added to dataChunks when data is received
        });
        response.on("end", () => {
          resolve(dataChunks); //emitted when entire responce has been received
        });
        response.on("error", (error: Error) => {
          reject(error);
        });
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
};
