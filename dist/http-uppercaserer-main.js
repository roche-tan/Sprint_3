"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUppercaseServer = void 0;
const http_1 = __importDefault(require("http"));
const through2_map_1 = __importDefault(require("through2-map")); // provides a simple API to transform data in streams. Used to modify data chunks that flow through a stream.
const createUppercaseServer = () => {
    return http_1.default.createServer(//creates a http server with http.createServer method
    (req, res) => {
        if (req.method === "POST") { //check if it is POST request
            req
                .pipe(//pipe method. Takes the incoming request stream and pipe it from a stream to another
            (0, through2_map_1.default)((chunk) => {
                return chunk.toString().toUpperCase(); //each chunk is converted to string and changed to uppercase
            }))
                .pipe(res); // res sent back to the client though pipe
        }
        else {
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end("Método no permitido");
        }
    });
};
exports.createUppercaseServer = createUppercaseServer;
