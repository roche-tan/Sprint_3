"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var my_first_io_1 = require("../my-first-io");
var fs_1 = __importDefault(require("fs")); //(import * as)  because we import from a node module
var path_1 = __importDefault(require("path"));
// import path from
describe("my-first-io", function () {
    it("Should be a function", function () {
        expect(my_first_io_1.countLines).toBeDefined();
    });
    it("Should count numbers of lines in a file", function () {
        var testFilePath = path_1.default.join(__dirname, "testFile.txt");
        fs_1.default.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3");
        expect((0, my_first_io_1.countLines)(testFilePath)).toBe(3);
        fs_1.default.unlinkSync(testFilePath);
    });
    it("Should not count if last line is empty", function () {
        var testFilePath = path_1.default.join(__dirname, "testFile.txt");
        fs_1.default.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3\n");
        expect((0, my_first_io_1.countLines)(testFilePath)).toBe(3);
        fs_1.default.unlinkSync(testFilePath);
    });
    // it("Should throw an error if no valid file path is provided", () => {
    //   // O si quieres probar con un string vacío
    //   expect(() => countLines("")).toThrow(
    //     "No se ha proporcionado un path de archivo válido."
    //   );
    // });
});
