import countLinesAsync from "../my-first-async-io";
import path from "path";

describe("countLinesAsync", () => {
  it("counts the number of lines in a file", async () => {
    const filePath = path.join(__dirname, "testfile.txt");
    console.log(filePath);
    const lineCount = await countLinesAsync(filePath);

    // Aquí, reemplaza 3 con el número de líneas que realmente tiene tu archivo de prueba.
    expect(lineCount).toBe(3);
  });

  it("throws an error when the file cannot be read", async () => {
    const filePath = path.join(__dirname, "nonexistent.txt");

    // Espera que se lance una excepción cuando el archivo no existe.
    await expect(countLinesAsync(filePath)).rejects.toThrow();
  });
});
