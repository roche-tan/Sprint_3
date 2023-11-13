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
const my_first_async_io_1 = __importDefault(require("../my-first-async-io"));
const path_1 = __importDefault(require("path"));
describe("countLinesAsync", () => {
    it("counts the number of lines in a file", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testfile.txt"); //__dirname is a global cariable that represents a directory name of the current module
        console.log(filePath);
        const lineCount = yield (0, my_first_async_io_1.default)(filePath);
        //lines of text in the file
        expect(lineCount).toBe(3);
    }));
    it("throws an error when the file cannot be read", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "nonexistent.txt");
        // waits to throw an exception when the file does not exist
        yield expect((0, my_first_async_io_1.default)(filePath)).rejects.toThrow();
    }));
});
