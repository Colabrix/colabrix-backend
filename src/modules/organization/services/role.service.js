import { getWriteDB } from '../../../config/databases.js';
import logger from '../../../shared/utils/logger.js';
import { invalidateRolePermissionCache } from '../../../shared/services/rbac/permission.service.js';

const prisma = getWriteDB();

export const createRole = async (organizationId, name, description, permissionIds) => {
  const role = await prisma.$transaction(async (tx) => {
    const newRole = await tx.role.create({
      data: {
        organizationId,
        name,
        description,
        isSystemRole: false,
      },
    });

    if (permissionIds && permissionIds.length > 0) {
      await tx.rolePermission.createMany({
        data: permissionIds.map((permId) => ({
          roleId: newRole.id,
          permissionId: permId,
        })),
      });
    }

    return newRole;
  });

  logger.info('Role created', { organizationId, roleId: role.id, name });

  return role;
};

export const getRole = async (roleId) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  return role;
};

export const getOrganizationRoles = async (organizationId) => {
  const roles = await prisma.role.findMany({
    where: { organizationId },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
      _count: {
        select: { members: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  return roles;
};

export const updateRole = async (roleId, name, description) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
  });

  if (role.isSystemRole) {
    throw new Error('Cannot update system role');
  }

  const updatedRole = await prisma.role.update({
    where: { id: roleId },
    data: { name, description },
  });

  logger.info('Role updated', { roleId, name });

  return updatedRole;
};

export const updateRolePermissions = async (roleId, permissionIds) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
  });

  if (role.isSystemRole) {
    throw new Error('Cannot update system role permissions');
  }

  await prisma.$transaction(async (tx) => {
    await tx.rolePermission.deleteMany({
      where: { roleId },
    });

    await tx.rolePermission.createMany({
      data: permissionIds.map((permId) => ({
        roleId,
        permissionId: permId,
      })),
    });
  });

  await invalidateRolePermissionCache(roleId);

  logger.info('Role permissions updated', { roleId, permissionCount: permissionIds.length });
};

export const deleteRole = async (roleId) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });

  if (role.isSystemRole) {
    throw new Error('Cannot delete system role');
  }

  if (role._count.members > 0) {
    throw new Error('Cannot delete role with active members');
  }

  await prisma.role.delete({
    where: { id: roleId },
  });

  logger.info('Role deleted', { roleId });
};

export const getAllPermissions = async () => {
  const permissions = await prisma.permission.findMany({
    orderBy: [{ resource: 'asc' }, { action: 'asc' }],
  });

  return permissions;
};
