"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baby_steps_1 = require("../baby-steps");
describe("baby-steps function", () => {
    it("Check if baby-steps it is a function", () => {
        expect(baby_steps_1.babySteps).toBeDefined();
    });
    it("Throw error if arguments are not numbers", () => {
        expect(() => (0, baby_steps_1.babySteps)(1, 2, "tres")).toThrow("Arguments must be numbers");
    });
    it("Should ignore null and undefined values", () => {
        expect((0, baby_steps_1.babySteps)(3, 4, null)).toBe(7);
        expect((0, baby_steps_1.babySteps)(3, undefined, 5)).toBe(8);
    });
    it("should return 0 if array is empty", () => {
        expect((0, baby_steps_1.babySteps)(0)).toBe(0);
    });
    it("Sum numbers passed as argument", () => {
        expect((0, baby_steps_1.babySteps)(1, 2, 3)).toBe(6);
        expect((0, baby_steps_1.babySteps)(0, 0, 0)).toBe(0);
        expect((0, baby_steps_1.babySteps)(10, -5, 8)).toBe(13);
        expect((0, baby_steps_1.babySteps)(1, 2, 3, 7, 8)).toBe(21);
    });
});
describe("processArgs function", () => {
    it("Check if processArgs it is a function", () => {
        expect(baby_steps_1.processArgs).toBeDefined();
    });
    it("Should process command-line arguments", () => {
        const argv = ["node", "baby-steps.js", "1", "2", "3"];
        const processedArgs = (0, baby_steps_1.processArgs)(argv);
        expect(processedArgs).toEqual([1, 2, 3]);
    });
});
