import { fetchData } from "./http-client-main";

const url: string = process.argv[2];

fetchData(url)
  .then((chunks) => {
    chunks.forEach((chunk) => console.log(chunk));
  })
  .catch((error) => {
    console.error(error);
  });
