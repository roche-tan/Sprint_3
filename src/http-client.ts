import { fetchData } from "./http-client-main";

const url: string = process.argv[2];

fetchData(url)
  .then((chunks) => {//it expect chunks and prints it 
    chunks.forEach((chunk) => console.log(chunk));
  })
  .catch((error) => {
    console.error(error);
  });
