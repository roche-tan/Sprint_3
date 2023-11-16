/*takes the arguments and sums them*/

export const babySteps = (...args: (number | null | undefined)[]): number => {
  // Filter out null and undefined values, then reduce
  return args
    .filter((arg): arg is number => arg !== null && arg !== undefined)
    .reduce((sum, arg) => {
      if (typeof arg !== "number" || isNaN(arg)) {
        throw new Error("Arguments must be numbers");
      }
      return sum + arg;
    }, 0);
};

//converts argv from string to numbers
export const processArgs = (argv: string[]): number[] => {
  //slice(2) - Take elements from argv[2] on
  return argv.slice(2).map((arg) => parseFloat(arg));
};

const args: number[] = processArgs(process.argv);

console.log(babySteps(...args));
