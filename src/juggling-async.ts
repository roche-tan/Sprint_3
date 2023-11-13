import { fetchData } from "./juggling-async-main";
// const url_1 = process.argv[2];
// const url_2 = process.argv[3];
// const url_3 = process.argv[4];

// const url_1 = "http://example.com/";
// const url_2 = "http://example.com/";
// const url_3 = "http://example.com/";

// assign urls into an array insted of having 3 differents variables
const urls = [process.argv[2], process.argv[3], process.argv[4]];

//Save the possition of each url
fetchData(urls)
  .then((result) => {//when resolved, result is printed
    result.forEach((result) => console.log(result));
  })
  .catch((error) => {
    console.log(error);
  });
