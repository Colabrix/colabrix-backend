import { httpError } from '../utils/response.js';
import { verifyAccessToken } from '../services/auth/jwt.js';
import { SessionManager } from '../../config/redis.js';
import logger from '../utils/logger.js';

const sessionManager = new SessionManager();

export const authenticate = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken.trim();
    }

    if (!token) {
      return httpError(req, res, new Error('No token provided'), 401);
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return httpError(req, res, new Error('Access token expired'), 401);
      }
      if (error.name === 'JsonWebTokenError') {
        return httpError(req, res, new Error('Invalid access token'), 401);
      }
      throw error;
    }

    if (!decoded.sessionId) {
      return httpError(req, res, new Error('Invalid token format'), 401);
    }

    const session = await sessionManager.getSession(decoded.sessionId);

    if (!session) {
      return httpError(req, res, new Error('Session expired or invalid'), 401);
    }

    req.user = {
      id: session.userId,
      email: session.email,
      phone: session.phone,
      isEmailVerified: session.isEmailVerified,
    };

    req.sessionId = decoded.sessionId;

    return next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return httpError(req, res, new Error('Invalid or expired token'), 500);
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken.trim();
    }

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = verifyAccessToken(token);

      if (!decoded.sessionId) {
        req.user = null;
        return next();
      }

      const session = await sessionManager.getSession(decoded.sessionId);

      if (session) {
        req.user = {
          id: session.userId,
          email: session.email,
          phone: session.phone,
          isEmailVerified: session.isEmailVerified,
        };
        req.sessionId = decoded.sessionId;
      } else {
        req.user = null;
      }
    } catch (authError) {
      logger.error('Optional auth error:', authError);
      req.user = null;
    }

    return next();
  } catch {
    req.user = null;
    return next();
  }
};

export const requireVerification = (req, res, next) => {
  if (!req.user || !req.user.isEmailVerified) {
    return httpError(req, res, new Error('Email verification required'), 403);
  }

  return next();
};
