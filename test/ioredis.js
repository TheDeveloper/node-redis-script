const { expect } = require('chai');
const { createScript } = require("../src");
const Ioredis = require('ioredis');
const ioredis = new Ioredis(6385);

describe('ioredis', () => {
  it('can use ioredis client', async () => {
    const src = `
      return 1
    `;
    const opts = { ioredis };
    const script = createScript(opts, src);
    const key = 'test-ioredis';
    const numKeys = 1;
    const result = await script(numKeys, key);
    expect(result).to.equal(1);
  });
})
