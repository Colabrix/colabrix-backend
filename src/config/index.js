import 'dotenv/config';

const config = {
  env: process.env.ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiVersion: process.env.API_VERSION || 'v1',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  database: {
    url: process.env.DATABASE_URL,
    readUrl: process.env.DATABASE_READ_URL,
  },
  mongodb: {
    url: process.env.MONGODB_URL,
  },
  redis: {
    clusterUrls: process.env.REDIS_CLUSTER_URLS?.split(',') || [],
    password: process.env.REDIS_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  },

  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },
  cors: {
    origins: process.env.CORS_ORIGIN?.split(',') || ['*'],
  },

  swagger: {
    username: process.env.SWAGGER_USERNAME || 'admin',
    password: process.env.SWAGGER_PASSWORD || 'admin',
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET,
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@colabrix.app',
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
  },

  encryption: {
    key: process.env.RESPONSE_ENCRYPTION_KEY || 'colabrix-default-32-char-key-12345',
    algorithm: 'aes-256-cbc',
  },
};

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// eslint-disable-next-line no-console
console.log(`Configuration loaded for environment: ${config.env}`);

export default config;
