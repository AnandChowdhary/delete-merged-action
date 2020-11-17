"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe("should merge default", () => {
    test("example-branch", () => {
        expect(util_1.shouldMerge("example-branch", util_1.defaultValue)).toBeTruthy();
    });
    test("main", () => {
        expect(util_1.shouldMerge("main", util_1.defaultValue)).toBeFalsy();
    });
    test("master", () => {
        expect(util_1.shouldMerge("master", util_1.defaultValue)).toBeFalsy();
    });
});
describe("should merge with input", () => {
    test("example-branch", () => {
        expect(util_1.shouldMerge("example-branch", "example-branch")).toBeTruthy();
    });
    test("example-branch", () => {
        expect(util_1.shouldMerge("example-branch-1", "example-branch")).toBeFalsy();
    });
    test("example-*", () => {
        expect(util_1.shouldMerge("example-branch", "example-*")).toBeTruthy();
    });
    test("example-*", () => {
        expect(util_1.shouldMerge("example-branch-1", "example-*")).toBeTruthy();
    });
    test("example-*, hello-*", () => {
        expect(util_1.shouldMerge("example-branch", "example-*")).toBeTruthy();
    });
    test("example-*, hello-*", () => {
        expect(util_1.shouldMerge("hello-world", "example-*")).toBeFalsy();
    });
    test("example-*,hello-*", () => {
        expect(util_1.shouldMerge("example-branch", "example-*")).toBeTruthy();
    });
    test("example-*,hello-*", () => {
        expect(util_1.shouldMerge("hello-world", "example-*")).toBeFalsy();
    });
});
//# sourceMappingURL=util.spec.js.map