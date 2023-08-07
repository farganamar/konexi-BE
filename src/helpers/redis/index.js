const redis = require('../../drivers/redis');

const setRedisData = (key, data, timeout = 0, db = 0) => {
  redis.select(db, () => {
    if (timeout === 0) {
      return redis.set(key, data);
    }
    return redis.setex(key, timeout, data);
  });
};

const getRedisData = (key, db = 0) => new Promise((resolve, reject) => {
  redis.select(db, (err) => {
    if (err) return reject(err);
    return redis.get(key, (error, data) => {
      if (err) return reject(error);

      return resolve(data);
    });
  });
});

const deleteRedisData = (key, db = 0) => {
  redis.select(db, () => redis.del(key));
};

const increment = ({ key, expiredInSeconds = 0 }) => new Promise(async (resolve) => {
  if (!redis.incr) {
    console.error('redis_error', 'redis.incr is not a function!');
    resolve(null);
    return;
  }

  redis.incr(key, (err, id) => {
    if (err) {
      console.error('redis_error', err?.message || err);
      resolve(null);
      return;
    }

    redis.expire(key, expiredInSeconds);

    resolve(id);
  });
});

const getTimeoutIncrementKey = (key) => new Promise(async (resolve) =>
  redis.ttl(key, (error, data) => {
    if (error) {
      resolve(true);
      return;
    }

    resolve(data);
  }));

const getUniqueProcess = ({ key, expiredInSeconds = 0 }) => new Promise((resolve) => {
  if (!redis.incr) {
    resolve(true);

    return;
  }

  redis.incr(key, (err, id) => {
    if (id === 1 && expiredInSeconds > 0) {
      redis.expire(key, expiredInSeconds);
    }

    resolve(id === 1);
  });
});

const resetUniqueProcess = (key) => new Promise((resolve) => {
  if (!redis.set) {
    resolve(true);

    return;
  }

  redis.del(key);

  resolve(true);
});

module.exports = {
  setRedisData,
  getRedisData,
  deleteRedisData,
  increment,
  getTimeoutIncrementKey,
  getUniqueProcess,
  resetUniqueProcess,
};
