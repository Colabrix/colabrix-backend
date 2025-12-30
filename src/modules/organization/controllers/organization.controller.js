import { httpResponse, asyncHandler, responseMessage } from '../../../shared/index.js';
import * as organizationService from '../services/organization.service.js';
import * as roleService from '../services/role.service.js';

export const health = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('Organization module is healthy'), {
    module: 'organization',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

export const create = asyncHandler(async (req, res) => {
  const { name, planType } = req.body;
  const userId = req.user.id;

  const organization = await organizationService.createOrganization({
    userId,
    name,
    planType,
  });

  return httpResponse(
    req,
    res,
    201,
    responseMessage.custom('Organization created successfully'),
    organization
  );
});

export const get = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;

  const organization = await organizationService.getOrganization(organizationId);

  if (!organization) {
    return httpResponse(req, res, 404, responseMessage.custom('Organization not found'), null);
  }

  return httpResponse(req, res, 200, responseMessage.SUCCESS.OK, organization);
});

export const update = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const data = req.body;

  const organization = await organizationService.updateOrganization(organizationId, data);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Organization updated successfully'),
    organization
  );
});

export const remove = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;

  await organizationService.deleteOrganization(organizationId);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Organization deleted successfully'),
    null
  );
});

export const addMember = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const { userId, roleId } = req.body;

  const member = await organizationService.addMember(organizationId, userId, roleId);

  return httpResponse(req, res, 201, responseMessage.custom('Member added successfully'), member);
});

export const updateMemberRole = asyncHandler(async (req, res) => {
  const { organizationId, userId } = req.params;
  const { roleId } = req.body;

  const member = await organizationService.updateMemberRole(organizationId, userId, roleId);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Member role updated successfully'),
    member
  );
});

export const removeMember = asyncHandler(async (req, res) => {
  const { organizationId, userId } = req.params;

  await organizationService.removeMember(organizationId, userId);

  return httpResponse(req, res, 200, responseMessage.custom('Member removed successfully'), null);
});

export const getRoles = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;

  const roles = await roleService.getOrganizationRoles(organizationId);

  return httpResponse(req, res, 200, responseMessage.SUCCESS.OK, roles);
});

export const createRole = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const { name, description, permissionIds } = req.body;

  const role = await roleService.createRole(organizationId, name, description, permissionIds);

  return httpResponse(req, res, 201, responseMessage.custom('Role created successfully'), role);
});

export const updateRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const { name, description } = req.body;

  const role = await roleService.updateRole(roleId, name, description);

  return httpResponse(req, res, 200, responseMessage.custom('Role updated successfully'), role);
});

export const updateRolePermissions = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const { permissionIds } = req.body;

  await roleService.updateRolePermissions(roleId, permissionIds);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Role permissions updated successfully'),
    null
  );
});

export const deleteRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;

  await roleService.deleteRole(roleId);

  return httpResponse(req, res, 200, responseMessage.custom('Role deleted successfully'), null);
});

export const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await roleService.getAllPermissions();

  return httpResponse(req, res, 200, responseMessage.SUCCESS.OK, permissions);
});

