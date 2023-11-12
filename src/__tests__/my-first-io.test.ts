import countLines from "../my-first-io";

// Mock fs module
jest.mock("fs", () => {
  return {
    readFileSync: jest.fn(() => Buffer.from("Line1\nLine2\nLine3\n")),
  };
});

describe("Count Lines", () => {
  it("counts the number of lines correctly", () => {
    const filename = "test.txt";
    const lineCount = countLines(filename);
    expect(lineCount).toBe(3);
  });

  it("returns 0 when the file is empty", () => {
    // Override the mock to simulate an empty file
    require("fs").readFileSync.mockReturnValue(Buffer.from(""));
    const filename = "empty.txt";
    const lineCount = countLines(filename);
    expect(lineCount).toBe(0);
  });
});
