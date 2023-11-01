"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processArgs = exports.babySteps = void 0;
// (...arg) To accept an indefinite number of arguments
var babySteps = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSum = 0;
    for (var i = 0; i < args.length; i++) {
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
var processArgs = function (argv) {
    //slice(2) - Take elements from argv[1] on
    return argv.slice(2).map(function (arg) { return parseFloat(arg); });
};
exports.processArgs = processArgs;
var args = (0, exports.processArgs)(process.argv);
console.log(exports.babySteps.apply(void 0, args));
