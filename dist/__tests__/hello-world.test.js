"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_world_1 = require("../hello-world");
describe("Print hello world in console", function () {
    it("it is a function ", function () {
        expect(hello_world_1.log).toBeDefined();
    });
    it("Show error if string is empty", function () {
        var message = "";
        expect(function () { return (0, hello_world_1.log)(message); }).toThrow("Message is empty");
    });
    it("Shows error if string is differet to Hello world", function () {
        var message = "Goodby world";
        expect(function () { return (0, hello_world_1.log)(message); }).toThrow("Message different to Hello world");
    });
    it("prints Hello world", function () {
        var consoleSpy = jest.spyOn(console, "log");
        (0, hello_world_1.log)("HELLO WORLD");
        expect(consoleSpy).toHaveBeenCalledWith("HELLO WORLD");
    });
});
