# Release Runbook

This repository uses continuous deployment. Production releases are created by
merging a pull request into `main`; release tags are not used.

## Repository Configuration

The following GitHub configuration is required:

- `main` is a protected branch.
- The `build` status check is required before merging.
- Conversation resolution is required before merging.
- The `production` environment allows deployments from protected branches.
- The repository secret `FIREBASE_SERVICE_ACCOUNT_HERMES_7B876` contains the
  Firebase service-account credentials.

Never put the Firebase credentials in this repository or in workflow logs.

## Normal Release

1. Start from an up-to-date `main` branch.
2. Create a feature branch for the content or code change.
3. Make the change and run the local build and validation commands:

   ```sh
   bash scripts/build-site.sh
   bash scripts/validate-content.sh
   ```

4. Open a pull request targeting `main`.
5. Wait for the `build` and security checks to pass.
6. Resolve all review conversations.
7. Squash merge the pull request.
8. Confirm that the `CI` and `Deploy to Firebase Hosting` workflows pass for
   the resulting `main` commit.
9. Verify the live site and record the deployed commit SHA if an audit trail is
   needed.

The production workflow builds the selected commit, validates the generated
site, uploads the `public` artifact, and deploys that exact artifact to the
Firebase live channel.

## Rollback

Rollback is a manual deployment of a known-good commit:

1. Open the **Actions** tab in GitHub.
2. Select **Deploy to Firebase Hosting**.
3. Choose **Run workflow**.
4. Enter the full 40-character commit SHA in the `ref` field.
5. Run the workflow and confirm both the build and deploy jobs pass.
6. Verify the live site.

Only immutable commit SHAs are accepted for manual deployments. Do not use a
branch name for rollback.

## Troubleshooting

- If CI fails, fix the pull request instead of bypassing the required check.
- If deployment fails after a successful build, inspect the deploy job logs and
  rerun the workflow only after resolving the cause.
- If the live site is unhealthy after a release, deploy the previous known-good
  commit SHA using the rollback procedure.
- If the Firebase secret is missing or invalid, update the GitHub repository
  secret without committing credentials.

## Prohibited Release Paths

- Do not deploy directly from a local machine as the normal release process.
- Do not create `release/*` tags to trigger deployment.
- Do not deploy arbitrary branches.
- Do not expose production secrets to build or validation jobs.
- Do not bypass branch protection, required checks, or the production
  environment controls.
