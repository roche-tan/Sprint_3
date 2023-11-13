import countLinesAsync from "../my-first-async-io";
import path from "path";

describe("countLinesAsync", () => {
  it("counts the number of lines in a file", async () => {
    const filePath = path.join(__dirname, "testfile.txt"); //__dirname is a global cariable that represents a directory name of the current module
    console.log(filePath);
    const lineCount = await countLinesAsync(filePath);

    //lines of text in the file
    expect(lineCount).toBe(3);
  });

  it("throws an error when the file cannot be read", async () => {
    const filePath = path.join(__dirname, "nonexistent.txt");

    // waits to throw an exception when the file does not exist
    await expect(countLinesAsync(filePath)).rejects.toThrow();
  });
});
