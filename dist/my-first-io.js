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
