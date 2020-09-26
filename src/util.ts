import minimatch from "minimatch";

export const defaultValue = "!master,!main,*";

/**
 * Whether a branch should be deleted
 * @param branch - Name of branch
 * @param rules - List of glob rules
 */
export const shouldMerge = (branch: string, rules?: string) => {
  console.log("Start: Debug should delete");
  const branches = (rules || "").split(",").map((branch) => branch.trim());
  let shouldMerge = branches.every((rule) => {
    console.log(branch, rule, minimatch(branch, rule));
    return minimatch(branch, rule);
  });
  console.log("End: Debug should delete, result:", shouldMerge);
  return shouldMerge;
};
