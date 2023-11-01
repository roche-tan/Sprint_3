import { babySteps, processArgs } from "../baby-steps";
describe("baby-steps function", function () {
    it("Check if baby-steps it is a function", function () {
        expect(babySteps).toBeDefined();
    });
    it("Throw error if arguments are not numbers", function () {
        expect(function () { return babySteps(1, 2, "tres"); }).toThrow("Arguments must be numbers");
    });
    it("Should ignore null and undefined values", function () {
        expect(babySteps(3, 4, null)).toBe(7);
        expect(babySteps(3, undefined, 5)).toBe(8);
    });
    it("should return 0 if array is empty", function () {
        expect(babySteps(0)).toBe(0);
    });
    it("Sum numbers passed as argument", function () {
        expect(babySteps(1, 2, 3)).toBe(6);
        expect(babySteps(0, 0, 0)).toBe(0);
        expect(babySteps(10, -5, 8)).toBe(13);
        expect(babySteps(1, 2, 3, 7, 8)).toBe(21);
    });
});
describe("processArgs function", function () {
    it("Check if processArgs it is a function", function () {
        expect(processArgs).toBeDefined();
    });
    it("Should process command-line arguments", function () {
        var argv = ["node", "baby-steps.js", "1", "2", "3"];
        var processedArgs = processArgs(argv);
        expect(processedArgs).toEqual([1, 2, 3]);
    });
});
