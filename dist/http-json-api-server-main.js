"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpServer = void 0;
const http_1 = __importDefault(require("http")); //module to create hhtp
const url_1 = __importDefault(require("url")); //module to analize request urls
const parseTime = (time) => {
    // configures date time to return object with 3 properties
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
};
const unixTime = (time) => {
    //configures time to unix time
    return { unixtime: time.getTime() };
};
const createHttpServer = () => {
    const parseQuery = (urlParsed) => {
        //process entry requests
        if (urlParsed.pathname === "/api/parsetime") {
            // if url is /api/parsetime returns parseTime
            return parseTime(new Date(urlParsed.query.iso));
        }
        else if (urlParsed.pathname === "/api/unixtime") {
            //if url is /api/unixtime returns unixTime"
            return unixTime(new Date(urlParsed.query.iso));
        }
        else {
            return "Enter a valid endpoint";
        }
    };
    const server = http_1.default.createServer(
    // create server
    (req, res) => {
        if (req.method === "GET") {
            const parsedUrl = url_1.default.parse(req.url, true); //url is a module. parse to get the url of the request as a string. true is used to convert it to object so the values are accessible
            const result = parseQuery(parsedUrl);
            if (typeof result === "string") {
                //if is a string, it is not valid
                res.writeHead(400, { "Content-Type": "application/json" }); //content sent is in jason format
                res.end(JSON.stringify({ error: "Invalid endpoint" }));
            }
            else {
                //in this case an object (parseTime and unixTime)
                res.writeHead(200, { "Content-Type": "application/json" }); //content sent is in jason format
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
