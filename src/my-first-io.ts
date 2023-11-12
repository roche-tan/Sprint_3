import fs from "fs";

const countLines = (filename: string): number => {
  const contents = fs.readFileSync(filename);
  const lines = contents.toString().split("\n").length - 1;
  return lines;
};
const pathFile = process.argv[2];
console.log(countLines(pathFile));

export default countLines;