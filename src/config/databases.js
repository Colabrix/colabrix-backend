import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import config from './index.js';
import { logger } from '../shared/index.js';
import { getRedisClient } from './redis.js';

let prisma;

function initializePrisma() {
  if (!prisma) {
    const adapter = new PrismaPg({ connectionString: config.database.url });
    prisma = new PrismaClient({
      adapter,
      log: config.env === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }
  return prisma;
}

async function connectDatabases() {
  try {
    logger.info('Connecting to databases...');

    await initializePrisma().$connect();
    logger.success('PostgreSQL connected');

    const redis = getRedisClient();
    if (redis) {
      await redis.ping();
      logger.success('Redis connected');
    }

    logger.success('All databases connected successfully');
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    throw error;
  }
}

function getWriteDB() {
  if (!prisma) {
    return initializePrisma();
  }
  return prisma;
}

async function checkDatabaseHealth() {
  const health = {
    postgresql: { connected: false, latency: null },
    redis: { connected: false, latency: null },
    errors: [],
  };

  try {
    const start = Date.now();
    await getWriteDB().$queryRaw`SELECT 1`;
    health.postgresql.connected = true;
    health.postgresql.latency = Date.now() - start;
  } catch (error) {
    health.errors.push(`PostgreSQL: ${error.message}`);
  }

  try {
    const redis = getRedisClient();
    if (redis) {
      const start = Date.now();
      await redis.ping();
      health.redis.connected = true;
      health.redis.latency = Date.now() - start;
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
      logger.info('PostgreSQL disconnected');
    }
    logger.info('All databases disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from databases:', error);
  }
}

export { connectDatabases, disconnectDatabases, getWriteDB, checkDatabaseHealth };
