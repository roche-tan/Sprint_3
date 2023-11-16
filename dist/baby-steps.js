"use strict";
/*takes the arguments and sums them*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.processArgs = exports.babySteps = void 0;
const babySteps = (...args) => {
    // Filter out null and undefined values, then reduce
    return args
        .filter((arg) => arg !== null && arg !== undefined)
        .reduce((sum, arg) => {
        if (typeof arg !== "number" || isNaN(arg)) {
            throw new Error("Arguments must be numbers");
        }
        return sum + arg;
    }, 0);
};
exports.babySteps = babySteps;
//converts argv from string to numbers
const processArgs = (argv) => {
    //slice(2) - Take elements from argv[2] on
    return argv.slice(2).map((arg) => parseFloat(arg));
};
exports.processArgs = processArgs;
const args = (0, exports.processArgs)(process.argv);
console.log((0, exports.babySteps)(...args));
