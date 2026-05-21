import {
  httpResponse,
  httpError,
  asyncHandler,
  responseMessage,
  logger,
} from '../../../shared/index.js';
import * as profileService from '../services/profile.service.js';

export const setupProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { displayName } = req.body;
    const avatarFile = req.file; 

    const result = await profileService.setupProfile({
      userId,
      displayName,
      avatarFile,
    });

    logger.info('Profile setup completed', {
      userId,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('Profile setup completed successfully'),
      result
    );
  } catch (error) {
    logger.error('Setup profile failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req,
      res,
      error,
      error.statusCode || 500,
      responseMessage.custom(error.message)
    );
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { displayName, bio, location } = req.body;
    const avatarFile = req.file;

    const result = await profileService.updateProfile({
      userId,
      displayName,
      bio,
      location,
      avatarFile,
    });

    logger.info('Profile updated', {
      userId,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('Profile updated successfully'),
      result
    );
  } catch (error) {
    logger.error('Update profile failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req,
      res,
      error,
      error.statusCode || 500,
      responseMessage.custom(error.message)
    );
  }
});

export const getProfileStatus = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const isComplete = await profileService.isProfileComplete(userId);

    logger.info('Profile status checked', {
      userId,
      isComplete,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('Profile status retrieved successfully'),
      { isComplete }
    );
  } catch (error) {
    logger.error('Get profile status failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req,
      res,
      error,
      error.statusCode || 500,
      responseMessage.custom(error.message)
    );
  }
});