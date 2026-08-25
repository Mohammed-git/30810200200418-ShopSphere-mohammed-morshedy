ShopSphere Production Rollback Plan
1. Detection Mechanism

A failed production release is detected using the UptimeRobot monitoring configured in Task 1.

Health Check Failure: UptimeRobot monitors the production backend /health endpoint and detects when the service becomes unavailable or stops returning a successful response.
Service Availability: An alert is triggered when the production service becomes unavailable, indicating that the latest release may have caused a production issue.
2. Restoration & Rollback Execution Steps

If a production release causes instability or service failure:

Identify the Failed Release
Check the UptimeRobot alert and Vercel deployment logs.
Identify the latest deployment associated with the failure.
Restore the Previous Working Version
Open the ShopSphere Backend project in Vercel.
Select the previous successful deployment.
Promote/redeploy the previous successful deployment to production.
If the issue is caused by a Git commit, revert the problematic commit using:
git revert <commit-hash>
Push the revert through the protected main branch so the CI/CD pipeline can deploy the restored version.
Verify Recovery
Confirm that the production /health endpoint returns successfully.
Confirm that UptimeRobot reports the service as available again.
Verify that the main application and backend API are responding normally.