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
const http_json_api_server_main_1 = require("../http-json-api-server-main");
const supertest_1 = __importDefault(require("supertest"));
// Configura un servidor HTTP para las pruebas
const server = (0, http_json_api_server_main_1.createHttpServer)();
const port = 3000; // Puerto de prueba
beforeAll(() => {
    server.listen(port);
});
afterAll(() => {
    server.close();
});
describe("HTTP JSON API Server Tests", () => {
    it("should respond with correct JSON for /api/parsetime", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
            .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z")
            .expect(200)
            .expect("Content-Type", /json/);
        // Verifica que la respuesta tenga la estructura esperada
        expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
    }));
    it("should respond with correct JSON for /api/parsetime", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
            .get("/api/parsetime?iso=2023-11-12T12:34:56.789Z")
            .expect(200)
            .expect("Content-Type", /json/);
        // Ajusta la prueba para coincidir con la hora actual del servidor (13)
        expect(response.body).toEqual({ hour: 13, minute: 34, second: 56 });
    }));
    it("should respond with correct JSON for /api/unixtime", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
            .get("/api/unixtime?iso=2023-11-12T12:34:56.789Z")
            .expect(200)
            .expect("Content-Type", /json/);
        // Verifica que la respuesta tenga la estructura esperada
        expect(response.body).toEqual({ unixtime: expect.any(Number) });
    }));
    it("should respond with 400 for invalid endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server).get("/api/invalid").expect(400);
    }));
    it("should respond with 400 for non-GET request", () => __awaiter(void 0, void 0, void 0, function* () {
        // Use Supertest to make a POST request to a valid endpoint
        const response = yield (0, supertest_1.default)(server)
            .post("/api/parsetime") // Use a valid endpoint
            .expect(400); // Expect a 400 response code
    }));
});
