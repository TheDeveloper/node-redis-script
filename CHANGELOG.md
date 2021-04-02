# [2.0.0](https://github.com/TheDeveloper/node-redis-script/compare/v1.0.3...v2.0.0) (2021-04-02)

**This is a major release and contain breaking changes. Please read this changelog before upgrading.**

### BREAKING CHANGES

* New way of passing redis client:

```js
const opts = { redis }; // or { ioredis } for ioredis
const incrbyEx = createScript(opts, incrbyExSrc);
```

Pass either `redis` (node-redis client) or `ioredis` (ioredis client).

```js
// node-redis
const redis = require('redis').createClient();
const opts = { redis };
const src = `return 1`;
const script = createScript(opts, src);
```

```js
// ioredis
const Ioredis = require('ioredis');
const ioredis = new Ioredis(6385);
const opts = { ioredis };
const src = `return 1`;
const script = createScript(opts, src);
```
