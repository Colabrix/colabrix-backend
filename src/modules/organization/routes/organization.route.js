import express from 'express';
import {
  create,
  get,
  update,
  remove,
  addMember,
  updateMemberRole,
  removeMember,
  getRoles,
  createRole,
  updateRole,
  updateRolePermissions,
  deleteRole,
  getPermissions,
  health,
} from '../controllers/organization.controller.js';
import { authenticate, validateRequest } from '../../../shared/index.js';
import { requirePermission } from '../../../shared/middleware/authorization.js';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  addMemberSchema,
  updateMemberRoleSchema,
  createRoleSchema,
  updateRoleSchema,
  updateRolePermissionsSchema,
} from '../validations/organization.schema.js';

const router = express.Router();

router.get('/health', health);

router.use(authenticate);

router.post('/', validateRequest(createOrganizationSchema, 'body'), create);

router.get('/permissions', getPermissions);

router.get('/:organizationId', requirePermission('organizations', 'read'), get);

router.patch(
  '/:organizationId',
  requirePermission('organizations', 'update'),
  validateRequest(updateOrganizationSchema, 'body'),
  update
);

router.delete('/:organizationId', requirePermission('organizations', 'delete'), remove);

router.post(
  '/:organizationId/members',
  requirePermission('members', 'create'),
  validateRequest(addMemberSchema, 'body'),
  addMember
);

router.patch(
  '/:organizationId/members/:userId/role',
  requirePermission('members', 'update'),
  validateRequest(updateMemberRoleSchema, 'body'),
  updateMemberRole
);

router.delete(
  '/:organizationId/members/:userId',
  requirePermission('members', 'delete'),
  removeMember
);

router.get('/:organizationId/roles', requirePermission('roles', 'read'), getRoles);

router.post(
  '/:organizationId/roles',
  requirePermission('roles', 'create'),
  validateRequest(createRoleSchema, 'body'),
  createRole
);

router.patch(
  '/:organizationId/roles/:roleId',
  requirePermission('roles', 'update'),
  validateRequest(updateRoleSchema, 'body'),
  updateRole
);

router.put(
  '/:organizationId/roles/:roleId/permissions',
  requirePermission('roles', 'update'),
  validateRequest(updateRolePermissionsSchema, 'body'),
  updateRolePermissions
);

router.delete('/:organizationId/roles/:roleId', requirePermission('roles', 'delete'), deleteRole);

export default router;
