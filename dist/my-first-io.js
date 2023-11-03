"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const countLines = (filename) => {
    const contents = fs_1.default.readFileSync(filename);
    const lines = contents.toString().split("\n").length - 1;
    return lines;
};
const pathFile = process.argv[2];
console.log(countLines(pathFile));
exports.default = countLines;
// --------------------------------------------
// // Imports module from Node. Allows to interact with file system.
// import fs from "fs";
// export const countLines = (pathFile: string): number => {
//   // if (!pathFile) {
//   //   throw new Error("No se ha proporcionado un path de archivo válido.");
//   // }
//   // readFileSync  module is used to read the contents of the file specified by pathFile.
//   const content: Buffer = fs.readFileSync(pathFile);
//   const lines = content.toString().split("\n").length - 1;
//   return lines;
// };
// const pathFile = process.argv[2];
// console.log(countLines(pathFile));
// --------------------------------------------
// // Imports module from Node. Allows to interact with file system.
// import fs from "fs";
// export const countLines = (pathFile: string): number => {
//   if (!pathFile) {
//     throw new Error("No se ha proporcionado un path de archivo válido.");
//   }
//   // readFileSync  module is used to read the contents of the file specified by pathFile.
//   const content: Buffer = fs.readFileSync(pathFile);
//   // const lines = content.toString().split("\n").length - 1;
//   const lines = content.toString().split("\n");
//   // Remove last empty line if exists
//   if (lines.length > 0 && lines[lines.length - 1] === "") {
//     lines.pop();
//   }
//   return lines.length;
// };
// const pathFile = process.argv[2];
// // to not execute during tests
// // if (require.main === module) {
// //   console.log(countLines(pathFile));
// // }
// // const pathFile = process.argv[2];
// console.log(countLines(pathFile));
//# sourceMappingURL=my-first-io.js.map