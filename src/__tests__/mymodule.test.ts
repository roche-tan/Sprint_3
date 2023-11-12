import fs from "fs";
import path from "path";
const myModule = require("../mymodule");

jest.mock("fs");
jest.mock("path");

describe("myModule", () => {
  it("filters files by extension", (done) => {
    const mockFiles = ["file1.txt", "file2.js", "script.ts"];
    (fs.readdir as unknown as jest.Mock).mockImplementation(
      (
        dir: string,
        callback: (err: NodeJS.ErrnoException | null, files: string[]) => void
      ) => {
        callback(null, mockFiles);
      }
    );
    (path.extname as unknown as jest.Mock).mockImplementation(
      (file: string) => {
        return "." + file.split(".")[1];
      }
    );

    myModule("/path/to/dir", "ts", (error: Error | null, files: string[]) => {
      expect(error).toBeNull();
      expect(files).toEqual(["script.ts"]);
      done();
    });
  });

  it("handles errors", (done) => {
    const mockError = new Error("Failed to read directory");
    (fs.readdir as unknown as jest.Mock).mockImplementation(
      (path, callback) => {
        callback(mockError, null);
      }
    );

    myModule("/path/to/dir", "ts", (error: Error, files: string) => {
      expect(error).toEqual(mockError);
      expect(files).toEqual([]);
      done();
    });
  });
});
