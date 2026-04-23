import {
  httpResponse,
  httpError,
  asyncHandler,
  responseMessage,
  logger,
} from '../../../shared/index.js';
import * as authService from '../services/auth.service.js';

export const health = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('Auth module is healthy'), {
    module: 'auth',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

export const register = asyncHandler(async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await authService.registerUser({ email, phone, password });
    logger.info('User registered', { email, requestId: req.requestId });
    return httpResponse(
      req,
      res,
      201,
      responseMessage.custom(
        'Registration successful. Please check your email to verify your account'
      ),
      user
    );
  } catch (error) {
    logger.error('Register failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    const user = await authService.verifyEmail(token);
    logger.info('Email verified', { userId: user.id, requestId: req.requestId });
    return httpResponse(req, res, 200, responseMessage.custom('Email verified successfully'), {
      id: user.id,
      email: user.email,
      isEmailVerified: true,
    });
  } catch (error) {
    logger.error('Email verification failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    logger.info('User logged in', { userId: result.user.id, requestId: req.requestId });
    return httpResponse(req, res, 200, responseMessage.custom('Login successful'), result);
  } catch (error) {
    logger.error('Login failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    logger.info('Password reset requested', { email, requestId: req.requestId });
    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('If the email exists, a password reset link has been sent'),
      null
    );
  } catch (error) {
    logger.error('Forgot password failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword({ token, password });
    logger.info('Password reset successful', { requestId: req.requestId });
    return httpResponse(
      req, res, 200, responseMessage.custom('Password reset successfully'), null
    );
  } catch (error) {
    logger.error('Reset password failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword({ userId, currentPassword, newPassword });
    logger.info('Password changed', { userId, requestId: req.requestId });
    return httpResponse(
      req, res, 200, responseMessage.custom('Password changed successfully'), null
    );
  } catch (error) {
    logger.error('Change password failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req;
    await authService.logoutUser(sessionId);
    logger.info('User logged out', { userId, requestId: req.requestId });
    return httpResponse(req, res, 200, responseMessage.custom('Logged out successfully'), null);
  } catch (error) {
    logger.error('Logout failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const logoutAllDevices = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    await authService.logoutAllDevices(userId);
    logger.info('User logged out from all devices', { userId, requestId: req.requestId });
    return httpResponse(
      req, res, 200, responseMessage.custom('Logged out from all devices'), null
    );
  } catch (error) {
    logger.error('Logout all devices failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});

export const getMe = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await authService.getUserProfile(userId);
    logger.info('User profile fetched', { userId, requestId: req.requestId });
    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('User profile retrieved successfully'),
      user
    );
  } catch (error) {
    logger.error('Get me failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req, res, error, error.statusCode || 500, responseMessage.custom(error.message)
    );
  }
});
