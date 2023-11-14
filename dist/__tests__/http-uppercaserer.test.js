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
const http_uppercaserer_main_1 = require("../http-uppercaserer-main");
const http = __importStar(require("http"));
describe("HTTP Uppercase Server", () => {
    let server;
    beforeAll(() => {
        server = (0, http_uppercaserer_main_1.createUppercaseServer)();
        server.listen(0); // Listen on a random available port
    });
    afterAll(() => {
        server.close(); // Close the server after tests
    });
    it("should convert POST request body to uppercase", (done) => {
        const { port } = server.address(); //server.address() returns an object containing the address information of the server
        const postData = "Hello, World!";
        const options = {
            hostname: "localhost",
            port,
            path: "/",
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Content-Length": Buffer.byteLength(postData), //is setting a header in the HTTP request options
            },
        };
        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                expect(data).toBe(postData.toUpperCase());
                done();
            });
        });
        req.write(postData); //This sends the postData in the body of the request.
        req.end(); //This ends the request. 
    });
    it("should respond with 405 for non-POST methods", (done) => {
        const { port } = server.address();
        const options = {
            hostname: "localhost",
            port,
            path: "/",
            method: "GET", // Using GET method to test
        };
        http.get(options, (res) => {
            expect(res.statusCode).toBe(405);
            done();
        });
    });
});
