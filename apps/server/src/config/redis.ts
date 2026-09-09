import { createClient, RedisClientType } from 'redis';
import { REDIS_URL } from './env';

let redisClient: RedisClientType | null = null;

const connectToRedis = async (): Promise<RedisClientType> => {
  try {
    if (redisClient && redisClient.isOpen) {
      console.log('✅ Redis client already connected');
      return redisClient;
    }

    redisClient = createClient({
      url: REDIS_URL,
    });

    // Handle Redis errors
    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Connected to Redis (Upstash)');
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis client is ready');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error('❌ Error connecting to Redis:', error);
    throw error;
  }
};

const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectToRedis first.');
  }
  return redisClient;
};

const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.disconnect();
    redisClient = null;
    console.log('✅ Disconnected from Redis');
  }
};

export {
  connectToRedis,
  getRedisClient,
  disconnectRedis,
  type RedisClientType,
};
