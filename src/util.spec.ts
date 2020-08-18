import { shouldMerge, defaultValue } from "./util";

describe("should merge default", () => {
  test("main", () => {
    expect(shouldMerge("example-branch", defaultValue)).toBeTruthy();
  });
});
