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
