import fs from "fs";
import path from "path";
const myModule = require("../mymodule");

jest.mock("fs");
jest.mock("path");

describe("myModule", () => {
  it("filters files by extension", (done) => {
    const mockFiles = ["file1.txt", "file2.js", "script.ts"];
    (fs.readdir as unknown as jest.Mock).mockImplementation( //jest mock function. The mock function, when called, invokes the callback with null for the error argument (indicating no error) and mockFiles for the files argument. 
      (
        dir: string,
        callback: (err: NodeJS.ErrnoException | null, files: string[]) => void // NodeJS.ErrnoException error object in nodejs
      ) => {
        callback(null, mockFiles);
      }
    );

    (path.extname as unknown as jest.Mock).mockImplementation(//mock implementation of path.extname
      (file: string) => {
        return "." + file.split(".")[1]; //takes the path.extname, it separates it from "." and takes 1s argument 
      }
    );

    myModule("/path/to/dir", "ts", (error: Error | null, files: string[]) => { //checks my funcion
      expect(error).toBeNull(); //it ensures no error ocured during the execution
      expect(files).toEqual(["script.ts"]);//checks that files array is equal to scripts.ts
      done();//test completed
    });
  });

  it("handles errors", (done) => {
    const mockError = new Error("Failed to read directory");
    (fs.readdir as unknown as jest.Mock).mockImplementation(
      (path, callback) => {
        callback(mockError, null); //if error, call error mock function
      }
    );

    myModule("/path/to/dir", "ts", (error: Error, files: string) => {
      expect(error).toEqual(mockError);//it ensures no error ocured during the execution
      expect(files).toEqual([]);//checks that files array is equal to empty
      done();
    });
  });
});
