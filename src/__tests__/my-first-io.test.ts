import { countLines } from "../my-first-io";
import fs from "fs"; //(import * as)  because we import from a node module
import path from "path";
// import path from

describe("my-first-io", () => {
  it("Should be a function", () => {
    expect(countLines).toBeDefined();
  });

  it("Should count numbers of lines in a file", () => {
    const testFilePath = path.join(__dirname, "testFile.txt");

    fs.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3");

    expect(countLines(testFilePath)).toBe(3);

    fs.unlinkSync(testFilePath);
  });

  it("Should not count if last line is empty", () => {
    const testFilePath = path.join(__dirname, "testFile.txt");

    fs.writeFileSync(testFilePath, "Line 1\nLine 2\nLine 3\n");

    expect(countLines(testFilePath)).toBe(3);

    fs.unlinkSync(testFilePath);
  });

  // it("Should throw an error if no valid file path is provided", () => {
  //   // O si quieres probar con un string vacío
  //   expect(() => countLines("")).toThrow(
  //     "No se ha proporcionado un path de archivo válido."
  //   );
  // });
});
