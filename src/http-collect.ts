import { fetchData } from "./http-collect-main";

const url = process.argv[2];

fetchData(url)
  // Data is being printed directly in fetch data. so there is no need to do anything else
  .catch((error) => {
    console.log(error);
  });