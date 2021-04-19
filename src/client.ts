import IORedis from "ioredis";
import { RedisClient } from "redis";

const { promisify } = require('util');

exports.ioredis = (ioredis: IORedis.Redis) => {
  return ioredis;
}

exports.nodeRedis = (redis: RedisClient) => {
  const script = promisify((...args: any[]) => redis.script(...args));
  const evalsha = promisify((...args: any[]) => redis.evalsha(...args));

  return {
    script,
    evalsha
  };
}
