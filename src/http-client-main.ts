import http from "http";

export const fetchData = (url: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    let dataChunks: string[] = [];

    http
      .get(url, (response) => {
        response.setEncoding("utf8");
        response.on("data", (chunk: string) => {
          dataChunks.push(chunk);
        });
        response.on("end", () => {
          resolve(dataChunks);
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
