import { Redis } from "ioredis";
import { RedisClient } from "redis";

const crypto = require('crypto');
const { nodeRedis, ioredis } = require('./client');

function createDigest(src: string): string {
  return crypto.createHash('sha1').update(src).digest('hex');
}

async function installScript(client: any, digest: string, src: string) {
  const result = await client.script('load', src);

  if (result !== digest) {
    throw new Error('digest mismatch');
  }
}

interface Opts {
  redis?: RedisClient,
  ioredis?: Redis
}

export type RunScript = (
  numKeys: number,
  ...args: any[]
) => Promise<string>

export function createScript (
  opts: Opts,
  src: string
): RunScript {
  let client: any;

  if (opts.redis) client = nodeRedis(opts.redis);
  if (opts.ioredis) client = ioredis(opts.ioredis);

  const digest = createDigest(src);

  return async function runScript(numKeys, ...args) {
      let result, err;
      try {
        result = await client.evalsha(digest, numKeys, ...args);
      } catch(e) {
        err = e;
      }

      if (err && err.message.includes('NOSCRIPT')) {
        await installScript(client, digest, src);
        // try again
        result = await client.evalsha(digest, numKeys, ...args);
      }

      return result;
  };
}
