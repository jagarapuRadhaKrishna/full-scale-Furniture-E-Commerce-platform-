const Redis = require('ioredis');
const logger = require('../utils/logger');

let redisClient = null;

const connectRedis = () => {
  try {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
    });

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      logger.error('❌ Redis connection error:', err.message);
    });

    redisClient.on('ready', () => {
      logger.info('⚡ Redis is ready to accept commands');
    });

    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error.message);
    return null;
  }
};

// Initialize Redis connection
const redis = connectRedis();

// Cache helper functions
const cache = {
  get: async (key) => {
    try {
      if (!redis) return null;
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Redis GET error:', error.message);
      return null;
    }
  },

  set: async (key, value, ttl = parseInt(process.env.REDIS_TTL) || 3600) => {
    try {
      if (!redis) return false;
      await redis.setex(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('Redis SET error:', error.message);
      return false;
    }
  },

  del: async (key) => {
    try {
      if (!redis) return false;
      await redis.del(key);
      return true;
    } catch (error) {
      logger.error('Redis DEL error:', error.message);
      return false;
    }
  },

  flush: async () => {
    try {
      if (!redis) return false;
      await redis.flushall();
      return true;
    } catch (error) {
      logger.error('Redis FLUSH error:', error.message);
      return false;
    }
  }
};

module.exports = { redis, cache };
