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
        fs_1.default.readdir.mockImplementation((dir, callback) => {
            callback(null, mockFiles);
        });
        path_1.default.extname.mockImplementation((file) => {
            return "." + file.split(".")[1];
        });
        myModule("/path/to/dir", "ts", (error, files) => {
            expect(error).toBeNull();
            expect(files).toEqual(["script.ts"]);
            done();
        });
    });
    it("handles errors", (done) => {
        const mockError = new Error("Failed to read directory");
        fs_1.default.readdir.mockImplementation((path, callback) => {
            callback(mockError, null);
        });
        myModule("/path/to/dir", "ts", (error, files) => {
            expect(error).toEqual(mockError);
            expect(files).toEqual([]);
            done();
        });
    });
});
