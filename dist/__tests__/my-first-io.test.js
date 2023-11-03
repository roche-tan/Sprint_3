"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_first_io_1 = __importDefault(require("../my-first-io"));
// Mock fs module
jest.mock("fs", () => {
    return {
        readFileSync: jest.fn(() => Buffer.from("Line1\nLine2\nLine3\n")),
    };
});
describe("Count Lines", () => {
    it("counts the number of lines correctly", () => {
        const filename = "test.txt";
        const lineCount = (0, my_first_io_1.default)(filename);
        expect(lineCount).toBe(3);
    });
    it("returns 0 when the file is empty", () => {
        // Override the mock to simulate an empty file
        require("fs").readFileSync.mockReturnValue(Buffer.from(""));
        const filename = "empty.txt";
        const lineCount = (0, my_first_io_1.default)(filename);
        expect(lineCount).toBe(0);
    });
});
// --------------------------------------------
// import { countLines } from "../my-first-io";
// import fs from "fs"; //(import * as)  because we import from a node module
// import path from "path";
// // import path from
// describe("my-first-io", () => {
//   it("Should be a function", () => {
//     expect(countLines).toBeDefined();
//   });
//   it("Should count numbers of lines in a file", () => {
//     const testFilePath = path.join(__dirname, "testFile.txt");
//     //write a test file
//     fs.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3");
//     expect(countLines(testFilePath)).toBe(3);
//     //deletes file specified in testFilePath
//     fs.unlinkSync(testFilePath);
//   });
//   it("Should not count if last line is empty", () => {
//     const testFilePath = path.join(__dirname, "testFile.txt");
//     fs.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3\n");
//     expect(countLines(testFilePath)).toBe(3);
//     fs.unlinkSync(testFilePath);
//   });
//   it("Should throw an error if no valid file path is provided", () => {
//     expect(() => countLines("")).toThrow(
//       "No se ha proporcionado un path de archivo válido."
//     );
//   });
// });
