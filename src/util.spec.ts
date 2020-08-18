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
