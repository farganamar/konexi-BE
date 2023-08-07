const redis = require('../redis');

const DEFAULT_CACHE = 'REDIS'
const REDIS_DB = 0;
const SEPARATOR_DATA_ADDITIONAL_REDIS = '|||||';

const setCacheData = async ({
  provider = DEFAULT_CACHE,
  table,
  key,
  data,
  additionalData = {},
  sortKey = null,
  sortValue = null,
  expiredAt = 0,
}) => {
  if (provider === 'REDIS') {
      const payload = `${data}${SEPARATOR_DATA_ADDITIONAL_REDIS}${JSON.stringify(additionalData)}`;

      if (expiredAt === 0) {
        await redis.set(key, payload);
      }

      if (expiredAt !== 0) {
        await redis.set(key, payload);
        await redis.expire(key, expiredAt);
      }
  }
};

const getCacheData = ({
  provider = DEFAULT_CACHE, table, key, sortKey = null, sortValue = null, throwError = true,
}) => new Promise(async (resolve, reject) => {
  if (provider === 'REDIS') {
    const data = await redis.get(key)
    const result = data?.split(SEPARATOR_DATA_ADDITIONAL_REDIS);
    const additionalData = result?.[1] ? JSON.parse(result?.[1]) : {};

    resolve({
      data: result?.[0] || null,
      ...additionalData,      
    })

  }
});

const deleteCacheData = async ({
  provider = DEFAULT_CACHE, table, key, sortKey = null, sortValue = null,
}) => {
  if (provider === 'REDIS') {
    redis.select(REDIS_DB, () => redis.del(key));
  }
};

module.exports = {
  setCacheData,
  getCacheData,
  deleteCacheData,
};
