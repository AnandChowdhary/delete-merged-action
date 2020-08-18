import { shouldMerge, defaultValue } from "./util";

describe("should merge default", () => {
  test("example-branch", () => {
    expect(shouldMerge("example-branch", defaultValue)).toBeTruthy();
  });
  test("main", () => {
    expect(shouldMerge("main", defaultValue)).toBeFalsy();
  });
  test("master", () => {
    expect(shouldMerge("master", defaultValue)).toBeFalsy();
  });
});

describe("should merge with input", () => {
  test("example-branch", () => {
    expect(shouldMerge("example-branch", "example-branch")).toBeTruthy();
  });
  test("example-branch", () => {
    expect(shouldMerge("example-branch-1", "example-branch")).toBeFalsy();
  });
  test("example-*", () => {
    expect(shouldMerge("example-branch", "example-*")).toBeTruthy();
  });
  test("example-*", () => {
    expect(shouldMerge("example-branch-1", "example-*")).toBeTruthy();
  });
  test("example-*, hello-*", () => {
    expect(shouldMerge("example-branch", "example-*")).toBeTruthy();
  });
  test("example-*, hello-*", () => {
    expect(shouldMerge("hello-world", "example-*")).toBeFalsy();
  });
  test("example-*,hello-*", () => {
    expect(shouldMerge("example-branch", "example-*")).toBeTruthy();
  });
  test("example-*,hello-*", () => {
    expect(shouldMerge("hello-world", "example-*")).toBeFalsy();
  });
});
