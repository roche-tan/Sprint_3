import { log } from "../hello-world";

describe("Print hello world in console", () => {
  it("it is a function ", () => {
    expect(log).toBeDefined();
  });
  it("Show error if string is empty", () => {
    const message = "";
    expect(() => log(message)).toThrow("Message is empty");
  });

  it("Shows error if string is differet to Hello world", () => {
    const message = "Goodby world";
    expect(() => log(message)).toThrow("Message different to Hello world");
  });

  it("prints Hello world", () => {
    const consoleSpy = jest.spyOn(console, "log");
    log("HELLO WORLD");
    expect(consoleSpy).toHaveBeenCalledWith("HELLO WORLD");
  });
});

