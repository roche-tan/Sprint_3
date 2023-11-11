import http from 'http'

// const url_1 = process.argv[2];
// const url_2 = process.argv[3];
// const url_3 = process.argv[4];

// const url_1 = "http://example.com/";
// const url_2 = "http://example.com/";
// const url_3 = "http://example.com/";

// assign urls into an array insted of having 3 differents variables
const urls = [process.argv[2], process.argv[3], process.argv[4]];

//Save the possition of each url
let results: string[] = new Array(urls.length);

//Count how many requests have been done. in this case should be 3
let requestsDone = 0;

urls.forEach((url, index) => {
  //loop to iterate in each url
  http
    .get(url, (response: any) => {
      let data = "";

      response.on("data", (chunk: string) => {
        data += chunk;
      });

      response.on("end", () => {
        results[index] = data; //data is assigned to the index in results
        requestsDone++; //increment requestsDone when request is done
        if (requestsDone === urls.length) {
          // if resquestsDone has the same length as the urls array, it prints each result
          results.forEach((result) => console.log(result));
        }
      });
    })
    .on("error", (error: Error) => {
      console.error("Request error: ", error);
    });
});
