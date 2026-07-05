import express from 'express';
import {
  generateInvite,
  validateInvite,
  acceptInvite,
  revokeInvite,
  getOrganizationInvites,
  health,
} from '../controllers/invite.controller.js';
import { authenticate, validateRequest } from '../../../shared/index.js';
import { requirePermission } from '../../../shared/middleware/authorization.js';
import { generateInviteSchema, validateInviteTokenSchema } from '../validations/invite.schema.js';

const router = express.Router();

router.get('/health', health);

router.get('/:token/validate', validateRequest(validateInviteTokenSchema, 'params'), validateInvite);

router.use(authenticate);

router.post(
  '/organizations/:organizationId',
  requirePermission('members', 'create'),
  validateRequest(generateInviteSchema, 'body'),
  generateInvite
);

router.get(
  '/organizations/:organizationId',
  requirePermission('members', 'read'),
  getOrganizationInvites
);

router.post('/:token/accept', acceptInvite);

router.delete('/:inviteId', requirePermission('members', 'delete'), revokeInvite);

export default router;
