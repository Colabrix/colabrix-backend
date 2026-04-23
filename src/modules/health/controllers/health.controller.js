import { checkDatabaseHealth } from '../../../config/databases.js';
import {
  httpResponse,
  responseMessage,
  httpError,
  asyncHandler,
} from '../../../shared/index.js';
import config from '../../../config/index.js';

const healthCheck = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('Service is healthy'), {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      external: Math.round(process.memoryUsage().external / 1024 / 1024),
    },
    cpu: {
      usage: process.cpuUsage(),
    },
  });
});

const detailedHealthCheck = asyncHandler(async (req, res) => {
  const startTime = Date.now();

  const dbHealth = await checkDatabaseHealth();

  const dbConnected = dbHealth.postgresql.write && dbHealth.postgresql.read;
  const hasErrors = dbHealth.errors && dbHealth.errors.length > 0;

  if (hasErrors || !dbConnected) {
    return httpError(req, res, new Error('Service is degraded'), 503);
  }

  return httpResponse(req, res, 200, responseMessage.custom('Service is healthy'), {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    version: process.env.npm_package_version || '1.0.0',
    responseTime: Date.now() - startTime,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      external: Math.round(process.memoryUsage().external / 1024 / 1024),
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
    },
    cpu: {
      usage: process.cpuUsage(),
    },
    databases: dbHealth,
  });
});

const readyCheck = asyncHandler(async (req, res) => {
  const dbHealth = await checkDatabaseHealth();

  const isReady = dbHealth.postgresql.write && dbHealth.postgresql.read;

  if (!isReady) {
    return httpError(req, res, new Error('Service is not ready'), 503);
  }

  return httpResponse(req, res, 200, responseMessage.custom('Service is ready'), {
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

const liveCheck = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('Service is alive'), {
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const databaseHealthCheck = asyncHandler(async (req, res) => {
  const dbHealth = await checkDatabaseHealth();

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Database health check completed'),
    dbHealth
  );
});

export { healthCheck, detailedHealthCheck, readyCheck, liveCheck, databaseHealthCheck };
