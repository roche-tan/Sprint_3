"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const through2_map_1 = __importDefault(require("through2-map"));
const port = process.argv[2];
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST") {
        req
            .pipe((0, through2_map_1.default)((chunk) => {
            return chunk.toString().toUpperCase();
        }))
            .pipe(res);
    }
    else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Método no permitido");
    }
});
server.listen(port);
