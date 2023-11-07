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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const my_first_async_io_1 = __importDefault(require("../my-first-async-io"));
// You need to mock the entire 'fs' module including 'fs/promises'
jest.mock("fs", () => {
    return {
        promises: {
            readFile: jest.fn(),
        },
    };
});
const mockedReadFile = fs_1.promises.readFile;
describe("Count Lines Async", () => {
    it("counts the number of lines correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock to return a promise that resolves to a Buffer
        mockedReadFile.mockResolvedValue(Buffer.from("Line1\nLine2\nLine3\n"));
        const filename = "test.txt";
        const lineCount = yield (0, my_first_async_io_1.default)(filename);
        expect(lineCount).toBe(3); // Since we have 3 lines followed by a new line
    }));
    it("throws an error when the file does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock to simulate a file not found error
        mockedReadFile.mockRejectedValue(new Error("File not found"));
        const filename = "nonexistent.txt";
        yield expect((0, my_first_async_io_1.default)(filename)).rejects.toThrow("File not found");
    }));
});
// ------------------------------------
// import { promises as fsPromises } from "fs";
// import countLinesAsync from "../my-first-async-io";
// jest.mock("fs", () => ({
//   promises: {
//     readFile: jest.fn(),
//   },
// }));
// // You may have to cast the mocked function to the correct type
// const mockedReadFile = fsPromises.readFile as jest.MockedFunction<
//   typeof fsPromises.readFile
// >;
// describe("Count Lines Async", () => {
//   it("counts the number of lines correctly", async () => {
//     mockedReadFile.mockResolvedValue(Buffer.from("Line1\nLine2\nLine3\n"));
//     const filename: string = "test.txt";
//     const lineCount: number = await countLinesAsync(filename);
//     expect(lineCount).toBe(3);
//   });
// ----------------------------------------------------------------
//   it("returns 0 when the file is empty", async () => {
//     mockedReadFile.mockResolvedValue(Buffer.from(""));
//     const filename: string = "empty.txt";
//     const lineCount: number = await countLinesAsync(filename);
//     expect(lineCount).toBe(0);
//   });
//   it("throws an error when the file does not exist", async () => {
//     mockedReadFile.mockRejectedValue(new Error("File not found"));
//     const filename: string = "nonexistent.txt";
//     await expect(countLinesAsync(filename)).rejects.toThrow("File not found");
//   });
// });
