import * as fs from "fs"; //to have all expotrs from file System modules. Need it for readFileSync

const countLines = (filename: string): number => {
  const contents = fs.readFileSync(filename); //fs.readFileSync is a function that  reads the content of the file in a sync way
  const lines = contents.toString().split("\n").length - 1; //contents is converted to string and then separated by character \n and obtains length
  return lines;
};
const pathFile = process.argv[2];
console.log(countLines(pathFile));

export default countLines;
