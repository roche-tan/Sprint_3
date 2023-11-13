"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs"); //imports the promise-based versions of functions from fs module.
const countLinesAsync = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield fs_1.promises.readFile(filename); //reads the content of the file
        const lines = contents.toString().split("\n").length - 1; //contents is converted to string and then separated by character \n and obtains length. -1 as last \n shows a new line but it is empty.
        return lines;
    }
    catch (error) {
        console.error("Error reading file:", error.message);
        throw error;
    }
});
const pathFile = process.argv[2];
countLinesAsync(pathFile)
    .then((lines) => {
    console.log(lines);
})
    .catch((error) => {
    // Instead of logging here, rethrow the error so it can be caught by the caller.
    throw error;
});
exports.default = countLinesAsync;
