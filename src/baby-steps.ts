// (...arg) To accept an indefinite number of arguments
export const babySteps = (...args: (number | null | undefined)[]): number => {
  let resultSum: number = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== null && args[i] !== undefined) {
      if (typeof args[i] !== "number") {
        throw new Error("Arguments must be numbers");
      }
      resultSum += args[i] as number;
    }
  }
  return resultSum;
};

export const processArgs = (argv: string[]): number[] => {
  //slice(2) - Take elements from argv[1] on
  return argv.slice(2).map((arg) => parseFloat(arg));
};

const args: number[] = processArgs(process.argv);

console.log(babySteps(...args));
