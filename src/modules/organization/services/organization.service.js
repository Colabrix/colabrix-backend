import { getWriteDB } from '../../../config/databases.js';
import logger from '../../../shared/utils/logger.js';
import { invalidateUserPermissionCache } from '../../../shared/services/rbac/permission.service.js';
import { invalidateOrganizationFeatureCache } from '../../../shared/services/rbac/feature.service.js';

const prisma = getWriteDB();

export const createOrganization = async ({ userId, name, planType = 'FREE' }) => {
  const plan = await prisma.plan.findUnique({
    where: { type: planType },
  });

  if (!plan) {
    throw new Error('Invalid plan type');
  }

  const organization = await prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: {
        name,
        ownerId: userId,
        planId: plan.id,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    const adminRole = await tx.role.create({
      data: {
        organizationId: org.id,
        name: 'Admin',
        description: 'Full access to organization',
        isSystemRole: true,
      },
    });

    const memberRole = await tx.role.create({
      data: {
        organizationId: org.id,
        name: 'Member',
        description: 'Standard member access',
        isSystemRole: true,
      },
    });

    await tx.role.create({
      data: {
        organizationId: org.id,
        name: 'Viewer',
        description: 'Read-only access',
        isSystemRole: true,
      },
    });

    const allPermissions = await tx.permission.findMany();

    await tx.rolePermission.createMany({
      data: allPermissions.map((perm) => ({
        roleId: adminRole.id,
        permissionId: perm.id,
      })),
    });

    const memberPermissions = allPermissions.filter(
      (p) => p.action === 'read' || p.action === 'create'
    );
    await tx.rolePermission.createMany({
      data: memberPermissions.map((perm) => ({
        roleId: memberRole.id,
        permissionId: perm.id,
      })),
    });

    await tx.organizationMember.create({
      data: {
        userId,
        organizationId: org.id,
        roleId: adminRole.id,
      },
    });

    return org;
  });

  logger.info('Organization created', { organizationId: organization.id, userId });

  return organization;
};

export const getOrganization = async (organizationId) => {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      plan: true,
      members: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              isEmailVerified: true,
            },
          },
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return org;
};

export const updateOrganization = async (organizationId, data) => {
  const org = await prisma.organization.update({
    where: { id: organizationId },
    data,
  });

  logger.info('Organization updated', { organizationId });

  return org;
};

export const changeOrganizationPlan = async (organizationId, newPlanId) => {
  const org = await prisma.organization.update({
    where: { id: organizationId },
    data: { planId: newPlanId },
  });

  await invalidateOrganizationFeatureCache(organizationId);

  logger.info('Organization plan changed', { organizationId, newPlanId });

  return org;
};

export const deleteOrganization = async (organizationId) => {
  await prisma.organization.delete({
    where: { id: organizationId },
  });

  logger.info('Organization deleted', { organizationId });
};

export const addMember = async (organizationId, userId, roleId) => {
  const member = await prisma.organizationMember.create({
    data: {
      userId,
      organizationId,
      roleId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  logger.info('Member added to organization', { organizationId, userId, roleId });

  return member;
};

export const updateMemberRole = async (organizationId, userId, roleId) => {
  const member = await prisma.organizationMember.update({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
    data: { roleId },
  });

  await invalidateUserPermissionCache(userId, organizationId);

  logger.info('Member role updated', { organizationId, userId, roleId });

  return member;
};

export const removeMember = async (organizationId, userId) => {
  await prisma.organizationMember.delete({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

  await invalidateUserPermissionCache(userId, organizationId);

  logger.info('Member removed from organization', { organizationId, userId });
};
