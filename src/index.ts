import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { EventPayloads } from "@octokit/webhooks";
import { shouldMerge } from "./util";

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

  const pullRequest = (context as any).payload
    .pull_request as EventPayloads.WebhookPayloadPullRequestPullRequest;
  const branchName = pullRequest.head.ref;

  console.log("Branches to delete are", getInput("branches"));
  console.log("This branch is", branchName);
  const should = shouldMerge(branchName, getInput("branches"));

  const pullRequestInfo = await octokit.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullRequest.number,
  });
  console.log("Should we delete this branch?", should);
  console.log("Is this PR merged?", pullRequestInfo.data.merged);

  /**
   * Pull request has been merged
   */
  if (pullRequestInfo.data.merged && should) {
    console.log("Proceeding to delete branch");
    try {
      await octokit.git.deleteRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: branchName,
      });
      console.log("Deleted branch");
    } catch (error) {
      console.log("Got an error in deleting", error);
    }
  } else {
    console.log("Not deleting this branch");
  }
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
