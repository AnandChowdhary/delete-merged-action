import minimatch from "minimatch";

export const defaultValue = "*,!master,!main";

/**
 * Whether a branch should be deleted
 * @param branch - Name of branch
 * @param rules - List of glob rules
 */
export const shouldMerge = (branch: string, rules?: string) => {
  const branches = (rules || "").split(",").map((branch) => branch.trim());
  let shouldMerge = false;
  branches.forEach((rule) => {
    shouldMerge = shouldMerge || minimatch(branch, rule);
  });
  return shouldMerge;
};
