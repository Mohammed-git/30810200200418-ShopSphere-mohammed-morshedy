# ShopSphere Production Rollback Plan

## 1. Detection Mechanism
A failed release in production is detected using the Prometheus and Grafana monitoring dashboard configured in Task 1:
* **HTTP 5xx Error Spikes:** Alerts trigger if HTTP 500 error rates exceed 5% over a 2-minute window.
* **Health Check Failures:** Prometheus metrics flag instances failing `/health` responses.
* **Latency Degradation:** P99 latency exceeding 2000ms triggers immediate incident investigation.

## 2. Restoration & Rollback Execution Steps
If a deployment degrades system stability, the following steps restore the previous stable release:
1. **Trigger Automated Rollback via Git / Deployment Platform:**
   * Revert the `main` branch to the previous stable commit using `git revert <commit-hash>`.
   * Alternatively, trigger a manual instant rollback on Vercel/Render platform to the previous successful deployment ID.
2. **Database Migration Safety Check:**
   * Inspect recent Prisma database migrations. If backwards-incompatible migrations occurred, execute the rollback migration script: `npx prisma migrate resolve`.
3. **Verification:**
   * Verify container health checks via Docker / Platform metrics dashboard.
   * Confirm error rate drops back to 0% on Grafana dashboards.