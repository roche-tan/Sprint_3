import { promises as fsPromises } from "fs";
import countLinesAsync from "../my-first-async-io";

// You need to mock the entire 'fs' module including 'fs/promises'
jest.mock("fs", () => {
  return {
    promises: {
      readFile: jest.fn(),
    },
  };
});

const mockedReadFile = fsPromises.readFile as jest.MockedFunction<
  typeof fsPromises.readFile
>;

describe("Count Lines Async", () => {
  it("counts the number of lines correctly", async () => {
    // Setup the mock to return a promise that resolves to a Buffer
    mockedReadFile.mockResolvedValue(Buffer.from("Line1\nLine2\nLine3\n"));

    const filename = "test.txt";
    const lineCount = await countLinesAsync(filename);
    expect(lineCount).toBe(3); // Since we have 3 lines followed by a new line
  });

  it("throws an error when the file does not exist", async () => {
    // Setup the mock to simulate a file not found error
    mockedReadFile.mockRejectedValue(new Error("File not found"));

    const filename = "nonexistent.txt";

    await expect(countLinesAsync(filename)).rejects.toThrow("File not found");
  });
});