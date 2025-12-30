import { hasPermission } from '../services/rbac/permission.service.js';
import {
  hasFeature,
  getFeatureLimit,
  getFeatureUsage,
  trackFeatureUsage as trackUsage,
} from '../services/rbac/feature.service.js';
import { httpError } from '../utils/response.js';
import logger from '../utils/logger.js';

export const requirePermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const organizationId = req.params.organizationId || req.body.organizationId;

      if (!organizationId) {
        return httpError(req, res, new Error('Organization ID required'), 400);
      }

      if (req.user.orgs) {
        const org = req.user.orgs.find((o) => o.orgId === organizationId);
        if (org && org.permissions.includes(`${resource}:${action}`)) {
          req.organization = { id: organizationId, role: org.roleName };
          return next();
        }
      }

      const allowed = await hasPermission(userId, organizationId, resource, action);

      if (!allowed) {
        logger.warn('Permission denied', {
          userId,
          organizationId,
          resource,
          action,
        });
        return httpError(
          req,
          res,
          new Error('You do not have permission to perform this action'),
          403
        );
      }

      req.organization = { id: organizationId };
      return next();
    } catch (error) {
      logger.error('Authorization error:', error);
      return httpError(req, res, error, 500);
    }
  };
};

export const requireFeature = (featureKey) => {
  return async (req, res, next) => {
    try {
      const organizationId = req.params.organizationId || req.body.organizationId;

      if (!organizationId) {
        return httpError(req, res, new Error('Organization ID required'), 400);
      }

      const allowed = await hasFeature(organizationId, featureKey);

      if (!allowed) {
        return httpError(
          req,
          res,
          new Error(`Feature "${featureKey}" not available in your plan`),
          403
        );
      }

      const limit = await getFeatureLimit(organizationId, featureKey);

      if (limit !== null) {
        const usedCount = await getFeatureUsage(organizationId, featureKey);

        if (usedCount >= limit) {
          return httpError(
            req,
            res,
            new Error(`Feature limit exceeded. Used ${usedCount}/${limit} this month.`),
            429
          );
        }

        req.featureUsage = {
          used: usedCount,
          limit,
          remaining: limit - usedCount,
        };
      }

      return next();
    } catch (error) {
      logger.error('Feature check error:', error);
      return httpError(req, res, error, 500);
    }
  };
};

export const trackFeatureUsage = async (organizationId, featureKey, count = 1) => {
  return trackUsage(organizationId, featureKey, count);
};

export const requireSystemRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return httpError(req, res, new Error('Unauthorized'), 401);
    }

    if (!roles.includes(req.user.systemRole)) {
      return httpError(req, res, new Error('Forbidden'), 403);
    }

    return next();
  };
};

export const requireSuperAdmin = requireSystemRole('SUPER_ADMIN');
