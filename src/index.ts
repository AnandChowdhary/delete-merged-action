import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import {} from "@octokit/webhooks";

const token =
  getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);

  /**
   * This action will only work on `pull_request` events
   */
  if (!context.payload.pull_request)
    return console.log("No pull request found");

  const pullRequest = context.payload.pull_request;
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
