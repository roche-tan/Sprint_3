import { promises as fsPromises } from "fs";

const countLinesAsync = async (filename: string): Promise<number> => {
  try {
    const contents = await fsPromises.readFile(filename);
    const lines = contents.toString().split("\n").length - 1;
    return lines;
  } catch (error: any) {
    console.error("Error reading file:", error.message);
    throw error;
  }
};

const pathFile = process.argv[2];

countLinesAsync(pathFile)
  .then((lines) => {
    console.log(lines);
  })
  .catch((error) => {
    // Instead of logging here, rethrow the error so it can be caught by the caller.
    throw error;
  });

export default countLinesAsync;