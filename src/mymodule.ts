import * as fs from "fs";
import * as path from "path";

export const myModule = async (
  directory: string,
  extension: string,
  callback: (error: Error | null, list: string[]) => void
): Promise<void> => {
  try {
    fs.readdir(directory, (error, files) => {
      if (error) {
        callback(error, []);
      }
      const filteredFiles = files.filter(
        (file: string) => path.extname(file) === "." + extension
      );
      callback(null, filteredFiles);
    });
  } catch (error: any) {
    callback(error, []);
  }
};
