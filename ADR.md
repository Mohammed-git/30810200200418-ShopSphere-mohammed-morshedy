# Architecture Decision Record (ADR) - ShopSphere Modernization

## 1. Review Service Extraction
* **Extracted Component:** Reviews Functionality.
* **Architecture:** Decoupled Node.js Express Microservice deployed independently on Vercel (`mohammed-morshedy-shop-sphere-revie.vercel.app`).
* **Rationale:** The review feature is read-heavy and computationally independent from core transaction workflows (e.g., checkout and cart operations). Extracting it isolates load spikes caused by user rating browsers from affecting core store performance, enables independent scaling, and enforces complete logical decoupling.

## 2. Serverless Workload Integration
* **Serverless Component:** Background Analytics & Metrics Logging Task.
* **Platform:** Vercel Serverless Functions (`/api/analytics`).
* **Rationale:** Background tasks, aggregate calculations, and telemetry reporting do not require a continuously running dedicated server. Using a serverless model ensures event-driven execution, reduces idle server infrastructure costs, and offloads non-critical async processing out of the core monolithic backend.