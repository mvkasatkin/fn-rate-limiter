# Function Call Rate Limiter

Install:
```shell
npm i fn-rate-limiter
```

Usage:

```typescript
import { fnRateLimiter } from 'fn-rate-limiter'

// Limit to 3 calls per 1 second
const rateLimitedFetch = fnRateLimiter(fetch, 3, 1000)
```
