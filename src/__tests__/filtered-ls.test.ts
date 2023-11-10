import { filteredLs } from "../filtered-ls";

import * as fs from "fs";
// import * as path from "path";

// Mock the all fs module. In this case is simulating the promise property. This mock function is used to as test-directory
// jest.fn() only mocks a unic function.
jest.mock("fs", () => {
  return {
    promises: {
      readdir: jest.fn(),
    },
  };
});

// variable to easier manage of the jest mock function. This calls a simulated readdir function created by jest.mock()
const mockedFsReaddir = fs.promises.readdir as unknown as jest.Mock;

describe("filteredLs", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockedFsReaddir.mockClear();
  });

  it("Should print the list of files to the console", async () => {
    const mockFiles = ["file1.txt", "file2.js", "file3.txt"];

    // Mock readdir implementation to return mockFiles. mockResolvedValue() is a jest function that specify the value that shoud return the mock function
    mockedFsReaddir.mockResolvedValue(mockFiles);

    // Spy on console, "log" to check if it gets called correctly
    const consoleSpy = jest.spyOn(console, "log");

    // Call the function with the directory and extension
    await filteredLs("./", ".txt");

    // Check if console.log was called with the correct filenames
    expect(consoleSpy).toHaveBeenCalledWith("file1.txt");
    expect(consoleSpy).toHaveBeenCalledWith("file3.txt");
    expect(consoleSpy).toHaveBeenCalledTimes(2); // Called two times for the two .txt files

    // Clean up the spy afterwards
    consoleSpy.mockRestore();
  });

  it("Should throw error if no extention has been passed", async () => {
    // Mock readdir implementation to return mockFiles
    mockedFsReaddir.mockResolvedValue([]);

    // This should be an async function because we are expecting a promise to reject
    await expect(filteredLs("./", "")).rejects.toThrow("No extension provided");
  });

  it("Should handle errors when reading directory", async () => {
    const errorMessage = "Failed to read directory";
    mockedFsReaddir.mockRejectedValue(new Error(errorMessage));

    const consoleError = jest.spyOn(console, "error");

    // Attempt to call the function with the directory and extension. We don't need to await the rejection because we are not testing the throw itself, but the console.error call
    filteredLs("./", ".txt").catch((error) => {});

    // Wait for all promises to resolve
    await new Promise(setImmediate);

    // Check if console.error was called with the correct error message
    expect(consoleError).toHaveBeenCalledWith(
      "Error reading directory:",
      expect.any(Error)
    );

    // Clean up the spy afterwards
    consoleError.mockRestore();
  });
});
