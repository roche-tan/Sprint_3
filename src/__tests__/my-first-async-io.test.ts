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

// ------------------------------------

// import { promises as fsPromises } from "fs";
// import countLinesAsync from "../my-first-async-io";

// jest.mock("fs", () => ({
//   promises: {
//     readFile: jest.fn(),
//   },
// }));

// // You may have to cast the mocked function to the correct type
// const mockedReadFile = fsPromises.readFile as jest.MockedFunction<
//   typeof fsPromises.readFile
// >;

// describe("Count Lines Async", () => {
//   it("counts the number of lines correctly", async () => {
//     mockedReadFile.mockResolvedValue(Buffer.from("Line1\nLine2\nLine3\n"));
//     const filename: string = "test.txt";
//     const lineCount: number = await countLinesAsync(filename);
//     expect(lineCount).toBe(3);
//   });
// ----------------------------------------------------------------

//   it("returns 0 when the file is empty", async () => {
//     mockedReadFile.mockResolvedValue(Buffer.from(""));
//     const filename: string = "empty.txt";
//     const lineCount: number = await countLinesAsync(filename);
//     expect(lineCount).toBe(0);
//   });

//   it("throws an error when the file does not exist", async () => {
//     mockedReadFile.mockRejectedValue(new Error("File not found"));
//     const filename: string = "nonexistent.txt";

//     await expect(countLinesAsync(filename)).rejects.toThrow("File not found");
//   });
// });
