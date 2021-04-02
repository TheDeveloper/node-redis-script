const { promisify } = require('util');

exports.ioredis = ioredis => {
  return ioredis;
}

exports.nodeRedis = redis => {
  const script = promisify((...args) => redis.script(...args));
  const evalsha = promisify((...args) => redis.evalsha(...args));

  return {
    script,
    evalsha
  };
}
