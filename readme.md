# Function Call Rate Limiter

![npm](https://img.shields.io/npm/v/fn-rate-limiter)
![NPM](https://img.shields.io/npm/l/fn-rate-limiter)
[![Coverage Status](https://coveralls.io/repos/github/mvkasatkin/fn-rate-limiter/badge.svg?branch=main)](https://coveralls.io/github/mvkasatkin/fn-rate-limiter?branch=main)

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
