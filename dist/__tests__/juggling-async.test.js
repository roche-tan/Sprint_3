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
const juggling_async_main_1 = require("../juggling-async-main");
const http_1 = __importDefault(require("http"));
jest.mock("http", () => ({
    get: jest.fn(),
}));
describe("fetchData", () => {
    beforeEach(() => {
        http_1.default.get.mockImplementation((url, callback) => {
            const mockResponse = {
                on: jest.fn((event, handler) => {
                    if (event === "data") {
                        handler("some data"); // Simula recibir algunos datos
                    }
                    if (event === "end") {
                        handler(); // Simula el final de la recepción de datos
                    }
                }),
            };
            callback(mockResponse);
            return { on: jest.fn() }; // Manejar el evento de error
        });
    });
    it("should accumulate data from multiple URLs", () => __awaiter(void 0, void 0, void 0, function* () {
        const urls = ["http://example.com/1", "http://example.com/2"];
        const data = yield (0, juggling_async_main_1.fetchData)(urls);
        expect(data).toEqual(["some data", "some data"]); // Ajustar según lo que esperes recibir
    }));
    it("should handle errors in HTTP requests", () => __awaiter(void 0, void 0, void 0, function* () {
        http_1.default.get.mockImplementationOnce((url, callback) => {
            const mockRequest = {
                on: jest.fn((event, handler) => {
                    if (event === "error") {
                        handler(new Error("Network error"));
                    }
                }),
            };
            return mockRequest;
        });
        const urls = ["http://example.com/1"];
        yield expect((0, juggling_async_main_1.fetchData)(urls)).rejects.toThrow("Network error");
    }));
    it("should handle errors in HTTP response", () => __awaiter(void 0, void 0, void 0, function* () {
        http_1.default.get.mockImplementationOnce((url, callback) => {
            const mockResponse = {
                on: jest.fn((event, handler) => {
                    if (event === "error") {
                        handler(new Error("Response error")); // Simular un error en la respuesta HTTP
                    }
                }),
            };
            callback(mockResponse);
            return { on: jest.fn() }; // Manejar el evento de error en la solicitud
        });
        const urls = ["http://example.com/1"];
        yield expect((0, juggling_async_main_1.fetchData)(urls)).rejects.toThrow("Response error");
    }));
});
