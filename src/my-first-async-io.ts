import { promises as fsPromises } from 'fs';

const countLinesAsync = async (filename: string): Promise<number> => {
  const contents = await fsPromises.readFile(filename);
  const lines = contents.toString().split("\n").length - 1;
  return lines;
};

export default countLinesAsync;
