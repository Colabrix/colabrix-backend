import { CacheManager } from '../../config/redis.js';
import { getPrisma } from '../../config/databases.js';
import logger from '../utils/logger.js';

const cache = new CacheManager();
const prisma = getPrisma();

const CACHE_TTL = 300;

export const getUserPermissions = async (userId, organizationId) => {
  const cacheKey = `user:${userId}:org:${organizationId}:permissions`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    logger.debug('Permission cache hit', { userId, organizationId });
    return cached;
  }

  logger.debug('Permission cache miss', { userId, organizationId });

  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!member) {
    return null;
  }

  const permissions = member.role.permissions.map(
    (rp) => `${rp.permission.resource}:${rp.permission.action}`
  );

  const result = {
    roleId: member.role.id,
    roleName: member.role.name,
    permissions,
  };

  await cache.set(cacheKey, result, CACHE_TTL);

  return result;
};

export const hasPermission = async (userId, organizationId, resource, action) => {
  const perms = await getUserPermissions(userId, organizationId);

  if (!perms) {
    return false;
  }

  return perms.permissions.includes(`${resource}:${action}`);
};

export const invalidateUserPermissionCache = async (userId, organizationId) => {
  const cacheKey = `user:${userId}:org:${organizationId}:permissions`;
  await cache.del(cacheKey);
  logger.info('Permission cache invalidated', { userId, organizationId });
};

export const invalidateRolePermissionCache = async (roleId) => {
  const members = await prisma.organizationMember.findMany({
    where: { roleId },
    select: { userId: true, organizationId: true },
  });

  await Promise.all(members.map((m) => invalidateUserPermissionCache(m.userId, m.organizationId)));

  logger.info('Role permission cache invalidated', { roleId, memberCount: members.length });
};
