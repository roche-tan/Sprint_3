import { log } from "../hello-world";
describe("Print hello world in console", () => {
    it("it is a function that prints hello world", () => {
        expect(log).toBeDefined();
    });
    it("Shows string", () => {
        expect("Hello world").toBe(true);
    });
});
