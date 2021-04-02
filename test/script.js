const { expect } = require('chai');
const { createScript } = require("../src");
const redis = require('redis').createClient({ port: 6385 });

describe('script', () => {
  it('runs script', async () => {
    const src = `
      local current
      current = redis.call('incrby',KEYS[1],ARGV[1])
      redis.call('expire',KEYS[1],ARGV[2]);
      return current
    `;
    const opts = { redis };
    const incrbyEx = createScript(opts, src);
    const numKeys = 1;
    const key = 'test';
    const incr = 1;
    const ex = 10;
    const result = await incrbyEx(numKeys, key, incr, ex);
    expect(result).to.equal(incr);
  });
});
