import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { randomUUID } from 'crypto';

import config from './config/index.js';
import router from './router/index.js';
import {
  swaggerUi,
  swaggerOptions,
  combinedDocs,
  healthSpec,
  authSpec,
  organizationSpec,
} from './config/swagger.js';
import { errorHandler, httpResponse, logger, notFoundHandler } from './shared/index.js';

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = config.cors.origins || [
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

if (config.env !== 'test') {
  const limiter = rateLimit({
    windowMs: config.rateLimiting.windowMs,
    max: config.rateLimiting.maxRequests,
    message: {
      message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.security('Rate limit exceeded', `IP: ${req.ip}`);
      return httpResponse(req, res, 429, 'Too many requests from this IP, please try again later.');
    },
  });
  app.use(limiter);
}

app.use(compression());

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.request(req, res.statusCode, duration);
  });

  next();
});

app.get('/', (req, res) => {
  return httpResponse(req, res, 200, 'Welcome to Colabrix API', {
    name: 'Colabrix API',
    version: config.apiVersion,
    environment: config.env,
    timestamp: new Date().toISOString(),
    documentation: {
      swagger: '/api-docs',
      health: '/v1/health',
    },
  });
});

const apiDocsAuth = (req, res, next) => {
  if (config.env === 'development') {
    return next();
  }

  const isStaticAsset = req.path.match(/\.(css|js|png|jpg|svg|ico|woff|woff2|ttf|json)$/i);
  const isSubPath = req.path !== '/api-docs' && req.path !== '/api-docs/';

  if (isStaticAsset || isSubPath) {
    return next();
  }

  const apiKey = req.headers['x-api-docs-key'] || req.query.key;
  const validKey = process.env.API_DOCS_KEY || 'dev-docs-key-2024';

  if (apiKey === validKey) {
    req.apiDocsAuthenticated = true;
    return next();
  }

  return res.status(403).json({
    status: 403,
    message: 'API Documentation Access Denied',
    error: 'Authentication Required',
    description: 'This API documentation is protected and requires a valid API key to access.',
    contact: 'Please contact your administrator to obtain an API documentation access key.',
    timestamp: new Date().toISOString(),
  });
};

app.use('/api-docs', apiDocsAuth, swaggerUi.serveFiles(combinedDocs, swaggerOptions));
app.get('/api-docs', apiDocsAuth, swaggerUi.setup(combinedDocs, swaggerOptions));

app.get('/api-docs/health.json', apiDocsAuth, (_, res) => res.json(healthSpec));
app.get('/api-docs/auth.json', apiDocsAuth, (_, res) => res.json(authSpec));
app.get('/api-docs/organization.json', apiDocsAuth, (_, res) => res.json(organizationSpec));

logger.info(`API Documentation: http://localhost:${config.port}/api-docs`);

app.use('/v1', router);

app.use(notFoundHandler);

app.use(errorHandler);

const gracefulShutdown = () => {
  logger.info('Received shutdown signal, shutting down gracefully...');

  const server = app.get('server');
  if (server) {
    server.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default app;
