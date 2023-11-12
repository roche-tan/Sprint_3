import http from "http";
export const fetchData = (urls: string[]): Promise<string[]> => {
  //Save the possition of each url
  let results: string[] = new Array(urls.length);

  //Count how many requests have been done. in this case should be 3
  let requestsDone = 0;

  return new Promise((resolve, reject) => {
    urls.forEach((url, index) => {
      //loop to iterate in each url
      http
        .get(url, (response) => {
          let data = "";

          response.on("data", (chunk: string) => {
            data += chunk;
          });

          response.on("end", () => {
            results[index] = data; //data is assigned to the index in results
            requestsDone++; //increment requestsDone when request is done
            if (requestsDone === urls.length) {
              // if resquestsDone has the same length as the urls array, it prints each result
              // results.forEach((result) => console.log(result)); Console will be done in juggling-async
              resolve(results);
            }
          });
          response.on("error", (error: Error) => {
            reject(error);
          });
        })
        .on("error", (error: Error) => {
          console.error("Request error: ", error);
        });
    });
  });
};
