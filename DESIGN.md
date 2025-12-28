1. Folder Structure Choice

I followed a layered architecture separating routes, controllers, services, and models. Routes handle HTTP concerns, controllers manage request/response, and services encapsulate business logic. This separation improves readability, testability, and scalability. Models are isolated to represent MongoDB schemas clearly.

2. Wallet Atomicity & Race Conditions

Wallet balance updates are handled using MongoDB atomic operators like $inc and single-document updates. For redeem operations, balance is first validated and then updated in a controlled flow. Since wallet data resides in a single document per user, MongoDB guarantees atomicity at document level, preventing race conditions in concurrent requests.

3. Indexing Trade-offs

Indexes were created on frequently queried fields like email and userId. While indexes improve read performance, they slightly slow down write operations and consume memory. Only necessary indexes were added to balance performance and resource usage.

4. Scaling to 10 Million Users

The system can be scaled horizontally by deploying multiple Express instances behind a load balancer. MongoDB can be scaled using sharding based on userId. Caching wallet balances using Redis and moving logs to async processing would further improve scalability.

5. Riskiest Part of Design

The wallet balance consistency is the most critical part. Any bug here could cause financial mismatch. Proper validations, atomic updates, and transaction logs mitigate this risk, but future improvements could include MongoDB transactions for multi-document consistency.
