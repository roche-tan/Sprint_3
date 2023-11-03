"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processArgs = exports.babySteps = void 0;
// (...arg) To accept an indefinite number of arguments
const babySteps = (...args) => {
    let resultSum = 0;
    for (let i = 0; i < args.length; i++) {
        if (args[i] !== null && args[i] !== undefined) {
            if (typeof args[i] !== "number") {
                throw new Error("Arguments must be numbers");
            }
            resultSum += args[i];
        }
    }
    return resultSum;
};
exports.babySteps = babySteps;
const processArgs = (argv) => {
    //slice(2) - Take elements from argv[1] on
    return argv.slice(2).map((arg) => parseFloat(arg));
};
exports.processArgs = processArgs;
const args = (0, exports.processArgs)(process.argv);
console.log((0, exports.babySteps)(...args));
//# sourceMappingURL=baby-steps.js.map