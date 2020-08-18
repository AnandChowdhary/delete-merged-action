import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { EventPayloads } from "@octokit/webhooks";
import minimatch from "minimatch";

const token =
  getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

/**
 * Whether a branch should be deleted
 * @param branch - Name of branch
 * @param rules - List of glob rules
 */
const shouldMerge = (branch: string, rules?: string) => {
  const branches = (rules || "").split(",").map((branch) => branch.trim());
  let shouldMerge = false;
  branches.forEach((rule) => {
    shouldMerge = shouldMerge || minimatch(branch, rule);
  });
  return shouldMerge;
};

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);

  /**
   * This action will only work on `pull_request` events
   */
  if (!context.payload.pull_request)
    return console.log("No pull request found");

  const pullRequest = (context as any).payload
    .pull_request as EventPayloads.WebhookPayloadPullRequestPullRequest;

  /**
   * Pull request has been merged
   */
  if (
    pullRequest.merged &&
    shouldMerge(pullRequest.base.ref, getInput("branches"))
  ) {
    try {
      if (
        !(getInput("branches") || "")
          .split(",")
          .map((branch) => branch.trim())
          .includes(pullRequest.base.ref)
      )
        await octokit.git.deleteRef({
          owner: context.repo.owner,
          repo: context.repo.repo,
          ref: pullRequest.base.ref,
        });
    } catch (error) {}
  }
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
