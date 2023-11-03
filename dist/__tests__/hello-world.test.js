"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_world_1 = require("../hello-world");
describe("Print hello world in console", () => {
    it("it is a function ", () => {
        expect(hello_world_1.log).toBeDefined();
    });
    it("Show error if string is empty", () => {
        const message = "";
        expect(() => (0, hello_world_1.log)(message)).toThrow("Message is empty");
    });
    it("Shows error if string is differet to Hello world", () => {
        const message = "Goodby world";
        expect(() => (0, hello_world_1.log)(message)).toThrow("Message different to Hello world");
    });
    it("prints Hello world", () => {
        const consoleSpy = jest.spyOn(console, "log");
        (0, hello_world_1.log)("HELLO WORLD");
        expect(consoleSpy).toHaveBeenCalledWith("HELLO WORLD");
    });
});
