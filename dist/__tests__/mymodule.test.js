"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const myModule = require("../mymodule");
jest.mock("fs");
jest.mock("path");
describe("myModule", () => {
    it("filters files by extension", (done) => {
        const mockFiles = ["file1.txt", "file2.js", "script.ts"];
        fs_1.default.readdir.mockImplementation(//jest mock function. The mock function, when called, invokes the callback with null for the error argument (indicating no error) and mockFiles for the files argument. 
        (dir, callback // NodeJS.ErrnoException error object in nodejs
        ) => {
            callback(null, mockFiles);
        });
        path_1.default.extname.mockImplementation(//mock implementation of path.extname
        (file) => {
            return "." + file.split(".")[1]; //takes the path.extname, it separates it from "." and takes 1s argument 
        });
        myModule("/path/to/dir", "ts", (error, files) => {
            expect(error).toBeNull(); //it ensures no error ocured during the execution
            expect(files).toEqual(["script.ts"]); //checks that files array is equal to scripts.ts
            done(); //test completed
        });
    });
    it("handles errors", (done) => {
        const mockError = new Error("Failed to read directory");
        fs_1.default.readdir.mockImplementation((path, callback) => {
            callback(mockError, null); //if error, call error mock function
        });
        myModule("/path/to/dir", "ts", (error, files) => {
            expect(error).toEqual(mockError); //it ensures no error ocured during the execution
            expect(files).toEqual([]); //checks that files array is equal to empty
            done();
        });
    });
});
