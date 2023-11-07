import { promises as fs } from "fs";
import * as path from "path"; // nodejs module. Provides functions to interact with and handle file and directory paths

export const filteredLs = async (
  directory: string,
  extension: string
): Promise<void> => {
  //returns void as is promise is solves without value, only console.log

  if (!extension) {
    throw new Error("No extension provided");
  }

  try {
    // readdir is used to read content in a directory
    const files = await fs.readdir(directory);
    if (Array.isArray(files)) {
      //make sure files is an array
      files.forEach((file) => {
        if (path.extname(file) === extension) {
          //If file has same extension as in parameter, it shows in console
          console.log(file);
        }
      });
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};

const directory: string = process.argv[2]; //in third command line
const extension: string = "." + process.argv[3]; //in fourth command line

filteredLs(directory, extension);
