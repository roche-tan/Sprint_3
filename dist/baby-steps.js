// (...arg) To accept an indefinite number of arguments
export var babySteps = function () {
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
export var processArgs = function (argv) {
    //slice(2) - Take elements from argv[1] on
    return argv.slice(2).map(function (arg) { return parseFloat(arg); });
};
var args = processArgs(process.argv);
console.log(babySteps.apply(void 0, args));
