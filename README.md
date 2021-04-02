redis-script
=======

Easily run redis scripts from Node.

# Requirements

* [node-redis](https://github.com/NodeRedis/node-redis) v0.10+
* Redis `v2.6` or above
* Node 10+

# Install

    npm install node-redis-script

# Usage

```javascript
const redis = require('redis').createClient();
const { createScript } = require('node-redis-script');

const incrbyExSrc = `
  local current
  current = redis.call('incrby',KEYS[1],ARGV[1])
  redis.call('expire',KEYS[1],ARGV[2]);
  return current
`;

// give it a redis client and script source
const opts = { redis }; // or { ioredis } for ioredis
const incrbyEx = createScript(opts, incrbyExSrc);
// you get back a function that runs your script with given args
// redis requires you to tell it how many keys to expect
const numKeys = 1;
const key = 'test';
const incr = 1;
const ex = 10;
const result = await incrbyEx(numKeys, key, incr, ex);
// Should print 1
console.log(result);
```

# Options
```js
const opts = {
  // you can use either node-redis or ioredis client
  redis, // node-redis client
  ioredis // ioredis client
};
```

# Test
```bash
# install docker & docker-compose for local redis setup
npm test
```
