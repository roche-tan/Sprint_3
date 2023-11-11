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
const http_1 = __importDefault(require("http"));
const http_client_1 = require("src/http-client");
jest.mock("http", () => ({
    get: jest.fn(),
}));
describe("HTTP GET Request", () => {
    it("should make an HTTP GET request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockChunk = "test data";
        const mockResponse = {
            setEncoding: jest.fn(),
            on: jest.fn((event, callback) => {
                if (event === "data") {
                    callback(mockChunk);
                }
                if (event === "end") {
                    callback();
                }
            }),
        };
        http_1.default.get.mockImplementation((url, callback) => {
            callback(mockResponse);
            return {
                on: jest.fn(),
            };
        });
        const data = yield (0, http_client_1.fetchData)("http://example.com");
        expect(data).toBe(mockChunk);
    }));
    // Additional tests for error handling, etc., can be added here
});
