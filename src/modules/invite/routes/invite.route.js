import express from 'express';
import * as inviteController from '../controllers/invite.controller.js';
import { authenticate } from '../../../shared/middleware/authentication.js';
import { requirePermission } from '../../../shared/middleware/authorization.js';
import { validateRequest } from '../../../shared/middleware/validation.js';
import { generateInviteSchema, validateInviteTokenSchema } from '../validators/invite.schema.js';

const router = express.Router();

router.post(
  '/organizations/:organizationId/invites',
  authenticate,
  requirePermission(['organization:invite']),
  validateRequest(generateInviteSchema),
  inviteController.generateInvite
);

router.get(
  '/invites/:token/validate',
  validateRequest(validateInviteTokenSchema, 'params'),
  inviteController.validateInvite
);

router.post(
  '/invites/:token/accept',
  authenticate,
  validateRequest(validateInviteTokenSchema, 'params'),
  inviteController.acceptInvite
);

router.delete(
  '/invites/:inviteId',
  authenticate,
  requirePermission(['organization:invite']),
  inviteController.revokeInvite
);

router.get(
  '/organizations/:organizationId/invites',
  authenticate,
  requirePermission(['organization:read']),
  inviteController.getOrganizationInvites
);

export default router;
