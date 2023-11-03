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
jest.mock("fs", () => ({
    promises: {
        readFile: jest.fn(),
    },
}));
// You may have to cast the mocked function to the correct type
const mockedReadFile = fs_1.promises.readFile;
describe("countLines", () => {
    it("counts the number of lines correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedReadFile.mockResolvedValue(Buffer.from("Line1\nLine2\nLine3\n"));
        const filename = "test.txt";
        const lineCount = yield (0, my_first_async_io_1.default)(filename);
        expect(lineCount).toBe(3);
    }));
    it("returns 0 when the file is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedReadFile.mockResolvedValue(Buffer.from(""));
        const filename = "empty.txt";
        const lineCount = yield (0, my_first_async_io_1.default)(filename);
        expect(lineCount).toBe(0);
    }));
    it("throws an error when the file does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedReadFile.mockRejectedValue(new Error("File not found"));
        const filename = "nonexistent.txt";
        yield expect((0, my_first_async_io_1.default)(filename)).rejects.toThrow("File not found");
    }));
});
//# sourceMappingURL=my-first-async-io.test.js.map