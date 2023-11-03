"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const log = (message) => {
    if (message === "") {
        throw new Error("Message is empty");
    }
    if (message !== "HELLO WORLD") {
        throw new Error("Message different to Hello world or empty");
    }
    console.log("HELLO WORLD");
};
exports.log = log;
(0, exports.log)("HELLO WORLD");
