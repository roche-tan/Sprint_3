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
const http_collect_main_1 = require("../http-collect-main");
const http_1 = __importDefault(require("http"));
jest.mock("http", () => ({
    get: jest.fn(),
}));
describe("HTTP GET Request", () => {
    it("should make an HTTP GET request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockChunks = ["test ", "data"];
        const mockResponse = {
            setEncoding: jest.fn(),
            on: jest.fn((event, callback) => {
                if (event === "data") {
                    mockChunks.forEach((chunk) => callback(chunk));
                }
                if (event === "end") {
                    callback();
                }
            }),
        };
        http_1.default.get.mockImplementation((url, callback) => {
            callback(mockResponse);
            return { on: jest.fn() };
        });
        const data = yield (0, http_collect_main_1.fetchData)("http://example.com");
        expect(data).toEqual(mockChunks);
    }));
    it("should handle response error event", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Test response error");
        const mockResponse = {
            setEncoding: jest.fn(),
            on: jest.fn((event, callback) => {
                if (event === "error") {
                    callback(mockError);
                }
            }),
        };
        http_1.default.get.mockImplementation((url, callback) => {
            callback(mockResponse);
            return { on: jest.fn() };
        });
        yield expect((0, http_collect_main_1.fetchData)("http://example.com")).rejects.toThrow("Test response error");
    }));
    it("should handle network error event", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNetworkError = new Error("Test network error");
        http_1.default.get.mockImplementation(() => {
            const request = {
                on: jest.fn((event, callback) => {
                    if (event === "error") {
                        callback(mockNetworkError);
                    }
                }),
            };
            return request;
        });
        yield expect((0, http_collect_main_1.fetchData)("http://example.com")).rejects.toThrow("Test network error");
    }));
});
