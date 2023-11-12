import * as fs from "fs"; // to work with files system
import * as path from "path"; //to work with files and directories path

const myModule = (
  directory: string,
  extension: string,
  callback: (error: Error | null, list: string[]) => void
): void => {
  try {
    fs.readdir(directory, (error, files) => {
      // reads the content f the directory and proceeds if there are no errors. If errors, jumps to callback
      if (error) {
        return callback(error, []);
      }
      //fileters files according to the extension
      const filteredFiles = files.filter(
        (file) => path.extname(file) === "." + extension
      );

      //calls callback if there is error
      callback(null, filteredFiles);
    });
  } catch (error: any) {
    //if there is an excepmtion, it calls callback
    callback(error, []);
  }
};

module.exports = myModule;
