import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          console.error('Redis connection failed after 3 retries');
          return null;
        }
        return Math.min(times * 200, 1000);
      },
    });

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redis.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
  }

  return redis;
}

export async function setCache(key: string, value: any, ttl: number = 3600): Promise<void> {
  const client = getRedisClient();
  await client.setex(key, ttl, JSON.stringify(value));
}

export async function getCache(key: string): Promise<any | null> {
  const client = getRedisClient();
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

export async function deleteCache(key: string): Promise<void> {
  const client = getRedisClient();
  await client.del(key);
}

export async function clearAllCache(): Promise<void> {
  const client = getRedisClient();
  await client.flushall();
  console.log('All Redis cache cleared');
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('Redis connection closed');
  }
}
