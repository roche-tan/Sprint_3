import { log } from "../hello-world";
describe("Print hello world in console", function () {
    it("it is a function ", function () {
        expect(log).toBeDefined();
    });
    it("Show error if string is empty", function () {
        var message = "";
        expect(function () { return log(message); }).toThrow("Message is empty");
    });
    it("Shows error if string is differet to Hello world", function () {
        var message = "Goodby world";
        expect(function () { return log(message); }).toThrow("Message different to Hello world");
    });
    it("prints Hello world", function () {
        var consoleSpy = jest.spyOn(console, "log");
        log("HELLO WORLD");
        expect(consoleSpy).toHaveBeenCalledWith("HELLO WORLD");
    });
});
