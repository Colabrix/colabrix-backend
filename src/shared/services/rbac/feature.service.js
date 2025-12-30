import { CacheManager } from '../../config/redis.js';
import { getPrisma } from '../../config/databases.js';
import logger from '../utils/logger.js';

const cache = new CacheManager();
const prisma = getPrisma();

const FEATURE_CACHE_TTL = 600;
const USAGE_TTL = 30 * 24 * 60 * 60;

export const getOrganizationFeatures = async (organizationId) => {
  const cacheKey = `org:${organizationId}:features`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      plan: {
        include: {
          features: {
            where: { isEnabled: true },
            include: {
              feature: true,
            },
          },
        },
      },
    },
  });

  if (!org) {
    return null;
  }

  const features = {};
  org.plan.features.forEach((pf) => {
    features[pf.feature.key] = {
      enabled: true,
      limit: pf.limit,
      metadata: pf.metadata,
    };
  });

  const result = {
    planType: org.plan.type,
    features,
  };

  await cache.set(cacheKey, result, FEATURE_CACHE_TTL);

  return result;
};

export const hasFeature = async (organizationId, featureKey) => {
  const features = await getOrganizationFeatures(organizationId);

  if (!features) {
    return false;
  }

  return features.features[featureKey]?.enabled || false;
};

export const getFeatureLimit = async (organizationId, featureKey) => {
  const features = await getOrganizationFeatures(organizationId);

  if (!features || !features.features[featureKey]) {
    return null;
  }

  return features.features[featureKey].limit;
};

export const getFeatureUsage = async (organizationId, featureKey) => {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const usageKey = `org:${organizationId}:feature:${featureKey}:usage:${month}`;

  const usedCount = (await cache.get(usageKey)) || 0;
  return usedCount;
};

export const trackFeatureUsage = async (organizationId, featureKey, count = 1) => {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const usageKey = `org:${organizationId}:feature:${featureKey}:usage:${month}`;

  await cache.incr(usageKey, USAGE_TTL);

  syncUsageToDatabase(organizationId, featureKey, count).catch((err) => {
    logger.error('Failed to sync usage to DB:', err);
  });
};

const syncUsageToDatabase = async (organizationId, featureKey, count) => {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  await prisma.featureUsage.upsert({
    where: {
      organizationId_featureKey_periodStart: {
        organizationId,
        featureKey,
        periodStart,
      },
    },
    update: {
      usedCount: { increment: count },
    },
    create: {
      organizationId,
      featureKey,
      usedCount: count,
      periodStart,
      periodEnd,
    },
  });
};

export const invalidateOrganizationFeatureCache = async (organizationId) => {
  const cacheKey = `org:${organizationId}:features`;
  await cache.del(cacheKey);
  logger.info('Feature cache invalidated', { organizationId });
};
