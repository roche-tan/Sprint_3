import { promises as fsPromises } from "fs"; //imports the promise-based versions of functions from fs module.

const countLinesAsync = async (filename: string): Promise<number> => {
  try {
    const contents = await fsPromises.readFile(filename); //reads the content of the file
    const lines = contents.toString().split("\n").length - 1; //contents is converted to string and then separated by character \n and obtains length. -1 as last \n shows a new line but it is empty.
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
