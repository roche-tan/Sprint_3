"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countLines = void 0;
// Imports module from Node. Allows to interact with file system.
var fs_1 = __importDefault(require("fs"));
var countLines = function (pathFile) {
    // if (!pathFile) {
    //   throw new Error("No se ha proporcionado un path de archivo válido.");
    // }
    // readFileSync  module is used to read the contents of the file specified by pathFile.
    var content = fs_1.default.readFileSync(pathFile);
    var lines = content.toString().split("\n").length - 1;
    return lines;
};
exports.countLines = countLines;
var pathFile = process.argv[2];
console.log((0, exports.countLines)(pathFile));
