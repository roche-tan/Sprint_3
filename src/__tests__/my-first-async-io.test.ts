import countLinesAsync from "../my-first-async-io";
import { promises as fsPromises } from "fs";

jest.mock('fs', () => {
  return {
    promises: {
      readFile: jest.fn().mockImplementation(() => {
        return Promise.resolve(Buffer.from("Line1\nLine2\nLine3\n"));
      }),
    },
  };
});

describe("countLinesAsync", () => {
  it("counts the number of lines in a file", async () => {
    const filename = "test.txt";
    const lineCount = await countLinesAsync(filename);
    expect(lineCount).toBe(3);
  });

  it("throws an error when the file cannot be read", async () => {
    // Mocking readFile to reject with an error
    (fsPromises.readFile as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error("File not found"));
    });

    const filename = "nonexistent.txt";
    await expect(countLinesAsync(filename)).rejects.toThrow("File not found");
  });
});
