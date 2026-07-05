import { randomBytes } from 'crypto';
import { getWriteDB } from '../../../config/databases.js';
import { sendEmail } from '../../../config/email.js';
import { logger } from '../../../shared/index.js';
import config from '../../../config/index.js';
import { inviteLinkTemplate } from '../utils/email.utils.js';

const prisma = getWriteDB();

export const generateInviteLink = async ({
  organizationId,
  inviterId,
  roleId,
  projectIds = [],
  isMultiUse = false,
  expiresInDays = 7,
  email = null,
}) => {
  const inviter = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: inviterId,
        organizationId,
      },
    },
    include: {
      role: true,
      organization: true,
      user: { select: { email: true } },
    },
  });

  if (!inviter) {
    const err = new Error('Inviter not found in organization');
    err.statusCode = 403;
    throw err;
  }

  const isOwner = inviter.organization.ownerId === inviterId;
  const isAdmin = inviter.role.name === 'Admin';

  if (!isOwner && !isAdmin) {
    const err = new Error('Only org owners and admins can generate invite links');
    err.statusCode = 403;
    throw err;
  }

  const role = await prisma.role.findFirst({
    where: { id: roleId, organizationId },
    select: { id: true },
  });

  if (!role) {
    const err = new Error('Invalid role for this organization');
    err.statusCode = 400;
    throw err;
  }

  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
  const rawToken = randomBytes(32).toString('hex');

  const invite = await prisma.organizationInvite.create({
    data: {
      organizationId,
      inviterId,
      roleId,
      projectIds,
      email,
      isMultiUse,
      token: rawToken,
      expiresAt,
    },
  });

  const inviteUrl = `${config.frontendUrl}/invite/${rawToken}`;

  if (email) {
    await sendEmail({
      to: email,
      subject: `You're invited to join ${inviter.organization.name} on Colabrix`,
      html: inviteLinkTemplate({
        organizationName: inviter.organization.name,
        inviterEmail: inviter.user?.email,
        inviteUrl,
        expiresAt,
      }),
    });
  }

  logger.info('Invite link generated', {
    inviteId: invite.id,
    organizationId,
    inviterId,
    email,
  });

  return {
    inviteId: invite.id,
    inviteUrl,
    token: rawToken,
    expiresAt,
  };
};

export const validateInviteToken = async (token) => {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    select: {
      id: true,
      organizationId: true,
      roleId: true,
      projectIds: true,
      isMultiUse: true,
      isUsed: true,
      expiresAt: true,
      email: true,
      organization: {
        select: { id: true, name: true, imageUrl: true },
      },
    },
  });

  if (!invite) {
    const err = new Error('Invite link is invalid or does not exist');
    err.statusCode = 404;
    throw err;
  }

  if (invite.isUsed && !invite.isMultiUse) {
    const err = new Error('This invite link has already been used');
    err.statusCode = 410;
    throw err;
  }

  if (new Date() > invite.expiresAt) {
    const err = new Error('This invite link has expired');
    err.statusCode = 410;
    throw err;
  }

  return {
    inviteId: invite.id,
    organization: invite.organization,
    roleId: invite.roleId,
    projectIds: invite.projectIds,
    email: invite.email,
    expiresAt: invite.expiresAt,
  };
};

export const acceptInvite = async (token, userId) => {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    select: {
      id: true,
      organizationId: true,
      roleId: true,
      isMultiUse: true,
      isUsed: true,
      expiresAt: true,
      organization: {
        select: { id: true, name: true, imageUrl: true },
      },
    },
  });

  if (!invite) {
    const err = new Error('Invite link is invalid or does not exist');
    err.statusCode = 404;
    throw err;
  }

  if (invite.isUsed && !invite.isMultiUse) {
    const err = new Error('This invite link has already been used');
    err.statusCode = 410;
    throw err;
  }

  if (new Date() > invite.expiresAt) {
    const err = new Error('This invite link has expired');
    err.statusCode = 410;
    throw err;
  }

  const existingMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: invite.organizationId,
      },
    },
  });

  if (existingMember) {
    return { alreadyMember: true, organization: invite.organization };
  }

  const roleId = invite.roleId || (
    await prisma.role.findFirst({
      where: { organizationId: invite.organizationId, name: 'Member', isSystemRole: true },
      select: { id: true },
    })
  )?.id;

  if (!roleId) {
    const err = new Error('No valid role found for this organization');
    err.statusCode = 500;
    throw err;
  }

  await prisma.$transaction([
    prisma.organizationMember.create({
      data: {
        userId,
        organizationId: invite.organizationId,
        roleId,
      },
    }),
    ...(!invite.isMultiUse
      ? [
          prisma.organizationInvite.update({
            where: { id: invite.id },
            data: { isUsed: true, usedAt: new Date() },
          }),
        ]
      : []),
  ]);

  return { alreadyMember: false, organization: invite.organization };
};

export const revokeInvite = async (inviteId, revokerId) => {
  const invite = await prisma.organizationInvite.findUnique({
    where: { id: inviteId },
    select: {
      id: true,
      organizationId: true,
      organization: { select: { ownerId: true } },
    },
  });

  if (!invite) {
    const err = new Error('Invite not found');
    err.statusCode = 404;
    throw err;
  }

  const revokerMembership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: revokerId,
        organizationId: invite.organizationId,
      },
    },
    include: { role: { select: { name: true } } },
  });

  const isOwner = invite.organization.ownerId === revokerId;
  const isAdmin = revokerMembership?.role?.name === 'Admin';

  if (!isOwner && !isAdmin) {
    const err = new Error('Only org owners and admins can revoke invites');
    err.statusCode = 403;
    throw err;
  }

  await prisma.organizationInvite.delete({ where: { id: inviteId } });
};

export const getOrganizationInvites = async (organizationId) => {
  const now = new Date();

  return prisma.organizationInvite.findMany({
    where: {
      organizationId,
      isUsed: false,
      expiresAt: { gt: now },
    },
    select: {
      id: true,
      email: true,
      roleId: true,
      isMultiUse: true,
      expiresAt: true,
      createdAt: true,
      inviterId: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};
