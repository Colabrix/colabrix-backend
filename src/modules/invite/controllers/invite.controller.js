import {
  httpResponse,
  httpError,
  asyncHandler,
  responseMessage,
  logger,
} from '../../../shared/index.js';
import * as inviteService from '../services/invite.service.js';

export const generateInvite = asyncHandler(async (req, res) => {
  try {
    const inviterId = req.user.id;
    const { organizationId } = req.params;
    const { roleId, projectIds, isMultiUse, expiresInDays, email } = req.body;

    const result = await inviteService.generateInviteLink({
      organizationId,
      inviterId,
      roleId,
      projectIds,
      isMultiUse,
      expiresInDays,
      email,
    });

    logger.info('Invite link generated', {
      inviteId: result.inviteId,
      organizationId,
      inviterId,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      201,
      responseMessage.custom('Invite link generated successfully'),
      result
    );
  } catch (error) {
    logger.error('Generate invite failed', {
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

export const validateInvite = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    const inviteData = await inviteService.validateInviteToken(token);

    logger.info('Invite token validated', {
      inviteId: inviteData.inviteId,
      requestId: req.requestId,
    });

    return httpResponse(req, res, 200, responseMessage.custom('Invite token is valid'), inviteData);
  } catch (error) {
    logger.error('Validate invite failed', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req,
      res,
      error,
      error.statusCode || 400,
      responseMessage.custom(error.message)
    );
  }
});

export const acceptInvite = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    const result = await inviteService.acceptInvite(token, req.user.id);

    logger.info('Invite accepted', {
      userid: req.user.id,
      organizationId: result.organization.id,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom(
        result.alreadyMember
          ? 'You are already a member of this organization'
          : 'Invite accepted successfully'
      ),
      result
    );
  } catch (error) {
    logger.error('Accept invite failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(
      req,
      res,
      error,
      error.statusCode || 400,
      responseMessage.custom(error.message)
    );
  }
});

export const revokeInvite = asyncHandler(async (req, res) => {
  try {
    const { inviteId } = req.params;

    await inviteService.revokeInvite(inviteId, req.user.id);

    logger.info('Invite revoked', {
      inviteId,
      revokerId: req.user.id,
      requestId: req.requestId,
    });

    return httpResponse(req, res, 200, responseMessage.custom('Invite revoked successfully'), null);
  } catch (error) {
    logger.error('Revoke invite failed', {
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

export const getOrganizationInvites = asyncHandler(async (req, res) => {
  try {
    const { organizationId } = req.params;

    const invites = await inviteService.getOrganizationInvites(organizationId);

    logger.info('Organization invites fetched', {
      organizationId,
      count: invites.length,
      requestId: req.requestId,
    });

    return httpResponse(
      req,
      res,
      200,
      responseMessage.custom('Invites retrieved successfully'),
      invites
    );
  } catch (error) {
    logger.error('Get organization invites failed', {
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
