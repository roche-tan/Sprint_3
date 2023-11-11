"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const port = process.argv[2];
const parseTime = (time) => {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
};
const unixTime = (time) => {
    return { unixtime: time.getTime() };
};
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
        const parsedUrl = url_1.default.parse(req.url, true); //true makes analise the chain and it transforms it in an object. If the second argument is mited, the data would be sent raw ie "name=John&age=30" instead of 'John', age: '30'.It makes it easier to access the values
        const result = parseQuery(parsedUrl);
        res.writeHead(200, { "Content-Type": "application/json" }); // applies code 200 (ok) and a indicates that the content of the response is of type JSON.
        res.end(JSON.stringify(result)); //converts it to a JSON string adn sends it as a response
    }
    else {
        res.writeHead(400);
        res.end();
    }
});
server.listen(port);
