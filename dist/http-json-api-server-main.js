"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpServer = void 0;
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const parseTime = (time) => {
    return {
        //returns an object with 3 properties
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
};
const unixTime = (time) => {
    return { unixtime: time.getTime() };
};
const createHttpServer = () => {
    const parseQuery = (urlParsed) => {
        if (urlParsed.pathname === "/api/parsetime") {
            return parseTime(new Date(urlParsed.query.iso));
        }
        else if (urlParsed.pathname === "/api/unixtime") {
            return unixTime(new Date(urlParsed.query.iso));
        }
        else {
            return "Enter a valid endpoint";
        }
    };
    const server = http_1.default.createServer((req, res) => {
        if (req.method === "GET") {
            const parsedUrl = url_1.default.parse(req.url, true);
            const result = parseQuery(parsedUrl);
            if (typeof result === "string") {
                // Ruta no válida
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid endpoint" }));
            }
            else {
                // Ruta válida
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            }
        }
        else {
            res.writeHead(400);
            res.end();
        }
    });
    return server;
};
exports.createHttpServer = createHttpServer;
