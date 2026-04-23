import Redis from 'ioredis';
import config from './index.js';
import { logger } from '../shared/index.js';

let redisClient;

function initializeRedis() {
  if (redisClient) {return redisClient;}

  try {
    if (config.redis.clusterUrls.length > 1) {
      const nodes = config.redis.clusterUrls.map((url) => {
        const parsed = new URL(url);
        return {
          host: parsed.hostname,
          port: parseInt(parsed.port, 10) || 6379,
        };
      });

      redisClient = new Redis.Cluster(nodes, {
        redisOptions: {
          password: config.redis.password,
          connectTimeout: 10000,
          lazyConnect: true,
          maxRetriesPerRequest: 3,
        },
        enableOfflineQueue: false,
        scaleReads: 'slave',
      });
    } else if (config.redis.clusterUrls.length === 1) {
      redisClient = new Redis(config.redis.clusterUrls[0], {
        connectTimeout: 10000,
        lazyConnect: true,
        maxRetriesPerRequest: 3,
      });
    } else {
      logger.warn('No Redis URLs configured');
      return null;
    }

    redisClient.on('error', (error) => logger.error('Redis error:', error));
    redisClient.on('reconnecting', () => logger.info('Redis reconnecting'));
  } catch (error) {
    logger.error('Failed to initialize Redis:', error);
  }

  return redisClient;
}

function getRedisClient() {
  if (!redisClient) {return initializeRedis();}
  return redisClient;
}

async function scanKeys(client, pattern) {
  const keys = [];
  let cursor = '0';

  do {
    const [nextCursor, batch] = await client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = nextCursor;
    keys.push(...batch);
  } while (cursor !== '0');

  return keys;
}

class CacheManager {
  constructor() {
    this.client = getRedisClient();
  }

  async get(key) {
    if (!this.client) {return null;}
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    if (!this.client) {return false;}
    try {
      await this.client.setex(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  async del(key) {
    if (!this.client) {return false;}
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      logger.error('Cache del error:', error);
      return false;
    }
  }

  async exists(key) {
    if (!this.client) {return false;}
    try {
      return (await this.client.exists(key)) === 1;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  }

  async incr(key, ttl = 3600) {
    if (!this.client) {return 0;}
    try {
      const value = await this.client.incr(key);
      if (value === 1) {await this.client.expire(key, ttl);}
      return value;
    } catch (error) {
      logger.error('Cache incr error:', error);
      return 0;
    }
  }
}

class SessionManager {
  constructor() {
    this.client = getRedisClient();
    this.prefix = 'session:';
    this.ttl = 604800;
  }

  async createSession(userId, sessionData, ttl = this.ttl) {
    if (!this.client) {return null;}
    try {
      const sessionId = `${userId}:${Date.now()}:${Math.random().toString(36).slice(2, 11)}`;
      await this.client.setex(
        this.prefix + sessionId,
        ttl,
        JSON.stringify({ userId, ...sessionData, createdAt: new Date().toISOString() })
      );
      return sessionId;
    } catch (error) {
      logger.error('Session create error:', error);
      return null;
    }
  }

  async getSession(sessionId) {
    if (!this.client) {return null;}
    try {
      const value = await this.client.get(this.prefix + sessionId);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Session get error:', error);
      return null;
    }
  }

  async deleteSession(sessionId) {
    if (!this.client) {return false;}
    try {
      await this.client.del(this.prefix + sessionId);
      return true;
    } catch (error) {
      logger.error('Session delete error:', error);
      return false;
    }
  }

  async deleteUserSessions(userId) {
    if (!this.client) {return false;}
    try {
      const keys = await scanKeys(this.client, `${this.prefix}${userId}:*`);
      if (keys.length === 0) {return true;}
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.del(key));
      await pipeline.exec();
      return true;
    } catch (error) {
      logger.error('Session deleteUserSessions error:', error);
      return false;
    }
  }
}

async function disconnectRedis() {
  try {
    if (redisClient) {await redisClient.disconnect();}
  } catch (error) {
    logger.error('Error disconnecting Redis:', error);
  }
}

export { initializeRedis, getRedisClient, CacheManager, SessionManager, disconnectRedis };
