import { promises as fsPromises } from "fs";

const countLinesAsync = async (filename: string): Promise<number> => {
  const contents = await fsPromises.readFile(filename);
  const lines = contents.toString().split("\n").length - 1;
  return lines;
};

const pathFile = process.argv[2];
console.log(countLinesAsync(pathFile));

export default countLinesAsync;
