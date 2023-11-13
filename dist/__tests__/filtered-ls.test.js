"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const filtered_ls_1 = require("../filtered-ls");
const fs = __importStar(require("fs"));
// import * as path from "path";
// Mock the all fs module. In this case is simulating the promise property. This mock function is used to as test-directory
// jest.fn() only mocks a unic function.
jest.mock("fs", () => {
    return {
        promises: {
            readdir: jest.fn(),
        },
    };
});
// variable to easier manage of the jest mock function. This calls a simulated readdir function created by jest.mock()
const mockedFsReaddir = fs.promises.readdir;
describe("filteredLs", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockedFsReaddir.mockClear();
    });
    it("Should print the list of files to the console", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFiles = ["file1.txt", "file2.js", "file3.txt"];
        // Mock readdir implementation to return mockFiles. mockResolvedValue() is a jest function that specify the value that shoud return the mock function
        mockedFsReaddir.mockResolvedValue(mockFiles);
        // Spy on console, "log" to check if it gets called correctly
        const consoleSpy = jest.spyOn(console, "log");
        // Call the function with the directory and extension
        yield (0, filtered_ls_1.filteredLs)("./", ".txt");
        // Check if console.log was called with the correct filenames
        expect(consoleSpy).toHaveBeenCalledWith("file1.txt");
        expect(consoleSpy).toHaveBeenCalledWith("file3.txt");
        expect(consoleSpy).toHaveBeenCalledTimes(2); // Called two times for the two .txt files
        // Clean up the spy afterwards
        consoleSpy.mockRestore();
    }));
    it("Should throw error if no extention has been passed", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock readdir implementation to return mockFiles
        mockedFsReaddir.mockResolvedValue([]);
        // This should be an async function because we are expecting a promise to reject
        yield expect((0, filtered_ls_1.filteredLs)("./", "")).rejects.toThrow("No extension provided");
    }));
    it("Should handle errors when reading directory", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Failed to read directory";
        mockedFsReaddir.mockRejectedValue(new Error(errorMessage));
        const consoleError = jest.spyOn(console, "error");
        // Attempt to call the function with the directory and extension. We don't need to await the rejection because we are not testing the throw itself, but the console.error call
        (0, filtered_ls_1.filteredLs)("./", ".txt").catch((error) => { });
        // Wait for promises to resolve
        yield new Promise(setImmediate);
        // Check if console.error was called error message
        expect(consoleError).toHaveBeenCalledWith("Error reading directory:", expect.any(Error));
        // Clean up the spy afterwards
        consoleError.mockRestore();
    }));
});
