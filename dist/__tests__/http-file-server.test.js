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
Object.defineProperty(exports, "__esModule", { value: true });
const http_file_server_main_1 = require("../http-file-server-main");
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const stream = __importStar(require("stream"));
jest.mock("fs");
describe("createFileServer", () => {
    let server;
    const mockFile = "test.txt";
    const mockContent = "Hello, World!";
    beforeEach(() => {
        // Mock fs.createReadStream
        fs.createReadStream.mockImplementation(() => {
            const readable = new stream.Readable();
            readable.push(mockContent); // Mock file content
            readable.push(null); // Indicate the end of the stream
            return readable;
        });
        server = (0, http_file_server_main_1.createFileServer)(mockFile);
    });
    it("should create a server that responds with file content", (done) => {
        server.listen(0, () => {
            const { port } = server.address();
            http.get(`http://localhost:${port}`, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    expect(data).toBe(mockContent);
                    server.close();
                    done();
                });
            });
        });
    });
});
describe('HTTP File Server', () => {
    let server;
    const mockFile = 'test.txt';
    const mockContent = 'Hello, World!';
    beforeAll(() => {
        // Mock fs.createReadStream
        fs.createReadStream.mockImplementation(() => {
            const readable = new stream.Readable();
            readable.push(mockContent); // Mock file content
            readable.push(null); // Indicate the end of the stream
            return readable;
        });
    });
    afterEach(() => {
        server.close(); // Ensure server is closed after each test
    });
    it('should respond with file content', done => {
        server = (0, http_file_server_main_1.createFileServer)(mockFile);
        server.listen(0, () => {
            const { port } = server.address();
            http.get(`http://localhost:${port}`, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    expect(data).toBe(mockContent);
                    done();
                });
            });
        });
    });
});
