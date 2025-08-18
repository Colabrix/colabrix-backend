import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import config from './index.js';
import logger from '../utils/logger.js';

let prisma;
let readPrisma;
let redisCluster;

function initializePrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: config.database.url,
        },
      },
      log:
        config.env === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  if (!readPrisma && config.database.readUrl) {
    readPrisma = new PrismaClient({
      datasources: {
        db: {
          url: config.database.readUrl,
        },
      },
      log:
        config.env === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  return { prisma, readPrisma: readPrisma || prisma };
}

async function initializeMongo() {
  if (mongoose.connection.readyState === 0 && config.mongodb.url) {
    await mongoose.connect(config.mongodb.url, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }
  return mongoose;
}

function initializeRedis() {
  if (!redisCluster && config.redis.clusterUrls.length > 0) {
    if (config.redis.clusterUrls.length === 1) {
      redisCluster = new Redis(config.redis.clusterUrls[0]);
    } else {
      redisCluster = new Redis.Cluster(
        config.redis.clusterUrls.map((url) => {
          const urlObj = new URL(url);
          return {
            host: urlObj.hostname,
            port: urlObj.port || 6379,
          };
        })
      );
    }
  }
  return redisCluster;
}

async function connectDatabases() {
  try {
    logger.info('🔌 Connecting to databases...');

    const { prisma: writeDB, readPrisma: readDB } = initializePrisma();
    await writeDB.$connect();
    logger.success('PostgreSQL (write) connected');

    if (readDB !== writeDB) {
      await readDB.$connect();
      logger.success('PostgreSQL (read) connected');
    }

    if (config.mongodb.url) {
      await initializeMongo();
      logger.success('MongoDB connected');
    }

    if (config.redis.clusterUrls.length > 0) {
      const redis = initializeRedis();
      await redis.ping();
      logger.success('Redis connected');
    }

    logger.success('All databases connected successfully');
  } catch (error) {
    logger.error(`❌ Database connection failed: ${error.message}`);
    throw error;
  }
}

function getWriteDB() {
  if (!prisma) {
    const { prisma: writeDB } = initializePrisma();
    return writeDB;
  }
  return prisma;
}

function getReadDB() {
  if (!readPrisma) {
    const { readPrisma: readDB } = initializePrisma();
    return readDB;
  }
  return readPrisma;
}

function getMongoose() {
  return mongoose;
}

function getRedisClient() {
  if (!redisCluster) {
    return initializeRedis();
  }
  return redisCluster;
}

async function checkDatabaseHealth() {
  const health = {
    postgresql: {
      write: false,
      read: false,
      writeLatency: null,
      readLatency: null,
    },
    mongodb: { connected: false, latency: null },
    redis: { connected: false, latency: null },
    errors: [],
  };

  try {
    const writeStart = Date.now();
    await getWriteDB().$queryRaw`SELECT 1`;
    health.postgresql.write = true;
    health.postgresql.writeLatency = Date.now() - writeStart;

    const readStart = Date.now();
    await getReadDB().$queryRaw`SELECT 1`;
    health.postgresql.read = true;
    health.postgresql.readLatency = Date.now() - readStart;
  } catch (error) {
    health.errors.push(`PostgreSQL: ${error.message}`);
  }

  try {
    if (config.mongodb.url) {
      const mongoStart = Date.now();
      await mongoose.connection.db.admin().ping();
      health.mongodb.connected = true;
      health.mongodb.latency = Date.now() - mongoStart;
    }
  } catch (error) {
    health.errors.push(`MongoDB: ${error.message}`);
  }

  try {
    if (config.redis.clusterUrls.length > 0) {
      const redisStart = Date.now();
      await getRedisClient().ping();
      health.redis.connected = true;
      health.redis.latency = Date.now() - redisStart;
    }
  } catch (error) {
    health.errors.push(`Redis: ${error.message}`);
  }

  return health;
}

async function disconnectDatabases() {
  try {
    logger.info('Disconnecting from databases...');

    if (prisma) {
      await prisma.$disconnect();
      logger.info('✅ PostgreSQL (write) disconnected');
    }
    if (readPrisma) {
      await readPrisma.$disconnect();
      logger.info('✅ PostgreSQL (read) disconnected');
    }
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      logger.info('✅ MongoDB disconnected');
    }
    if (redisCluster) {
      redisCluster.disconnect();
      logger.info('✅ Redis disconnected');
    }

    logger.info('🎉 All databases disconnected successfully');
  } catch (error) {
    logger.error('❌ Error disconnecting from databases:', error);
  }
}

export {
  connectDatabases,
  disconnectDatabases,
  getWriteDB,
  getReadDB,
  getMongoose,
  getRedisClient,
  checkDatabaseHealth,
};
