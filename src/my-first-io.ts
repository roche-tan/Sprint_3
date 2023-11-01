// Imports module from Node. Allows to interact with file system.
import fs from "fs";

export const countLines = (pathFile: string): number => {
  // if (!pathFile) {
  //   throw new Error("No se ha proporcionado un path de archivo válido.");
  // }

  // readFileSync  module is used to read the contents of the file specified by pathFile.
  const content: Buffer = fs.readFileSync(pathFile);

  const lines = content.toString().split("\n").length - 1;

  return lines;
};

const pathFile = process.argv[2];
console.log(countLines(pathFile));
