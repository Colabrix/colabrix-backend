import { getWriteDB } from '../../../config/databases.js';
import { sendEmail } from '../../../config/email.js';
import { logger } from '../../../shared/index.js';
import config from '../../../config/index.js';
import { randomBytes } from 'crypto';
import { inviteLinkTemplate } from '../utils/email.utils.js';
import { PlanType } from '@prisma/client';

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
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const token = randomBytes(32).toString('hex');

  const [inviter, role] = await Promise.all([
    prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: inviterId,
          organizationId,
        },
      },
      include: {
        role: true,
        organization: true,
      },
    }),

    prisma.role.findFirst({
      where: {
        id: roleId,
        organizationId,
      },
    }),
  ]);

  if (!inviter) {
    throw new Error('Inviter not found in organization');
  }

  const isOwner = inviter.organization.ownerId === inviterId;
  const isAdmin = inviter.role.name === 'Admin';

  if (!isOwner && !isAdmin) {
    throw new Error('Only Org Owners and Admins can generate invite links');
  }

  if (!role) {
    throw new Error('Invalid role for this organization');
  }

  let projectsPromise = Promise.resolve([]);

  if (projectIds.length > 0) {
    projectsPromise = prisma.project.findMany({
      where: {
        id: { in: projectIds },
        organizationId,
      },
      select: { id: true },
    });
  }

  const [projects] = await Promise.all([projectsPromise]);

  if (projectIds.length > 0 && projects.length !== projectIds.length) {
    throw new Error('One or more projects not found in organization');
  }

  const invite = await prisma.organizationInvite.create({
    data: {
      organizationId,
      email,
      roleId,
      inviterId,
      token,
      expiresAt,
      projectIds,
      isMultiUse,
    },
  });

  const inviteUrl = `${config.frontendUrl}/invite/${token}`;

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
    token,
    expiresAt,
  };
};

export const validateInviteToken = async (token) => {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          ownerId: true,
          plan: {
            select: {
              type: true,
              maxMembers: true,
            },
          },
        },
      },
      inviter: {
        select: {
          user: {
            select: {
              email: true,
              displayName : true
            },
          },
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

  if (!invite) {
    throw new Error('This invite link is invalid.');
  }

  await Promise.all([
    (async () => {
      if (invite.isRevoked) {
        throw new Error('This invite link is no longer valid.');
      }
    })(),

    (async () => {
      if (!invite.isMultiUse && invite.isUsed) {
        throw new Error('This invite link has already been used.');
      }
    })(),

    (async () => {
      if (new Date() > invite.expiresAt) {
        throw new Error('This invite link has expired. Ask your Org Admin to send a new one.');
      }
    })(),
  ]);

  const projectsPromise = prisma.project.findMany({
    where: {
      id: { in: invite.projectIds },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const [projects] = await Promise.all([projectsPromise]);

  return {
    inviteId: invite.id,
    organization: invite.organization,
    role: invite.role,
    projects,
    inviterEmail: invite.inviter.user.email,
    inviterDisplayName : invite.inviter.user.displayName || 'Unknown User',
    isMultiUse: invite.isMultiUse,
  };
};

export const acceptInvite = async (token, userId) => {
  const inviteData = await validateInviteToken(token);

  const { inviteId, organization, role, projects } = inviteData;

  const [existingMember, memberCount] = await Promise.all([
    prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: organization.id,
        },
      },
    }),

    organization.plan.type === PlanType.FREE
      ? prisma.organizationMember.count({
          where: { organizationId: organization.id },
        })
      : Promise.resolve(0),
  ]);

  if (existingMember) {
    logger.info('User already in organization', {
      userId,
      organizationId: organization.id,
    });

    return {
      alreadyMember: true,
      organization,
      projects,
    };
  }

  if (
    organization.plan.type === PlanType.FREE &&
    memberCount >= (organization.plan.maxMembers || 5)
  ) {
    throw new Error(
      'This organisation has reached its member limit. Please upgrade the plan.'
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const member = await tx.organizationMember.create({
      data: {
        userId,
        organizationId: organization.id,
        roleId: role.id,
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

    await tx.organizationInvite.update({
      where: { id: inviteId },
      data: {
        isUsed: true,
        usedBy: userId,
        usedAt: new Date(),
      },
    });

    return { member };
  });

  logger.info('User accepted invite and joined organization', {
    userId,
    organizationId: organization.id,
    inviteId,
  });

  return {
    alreadyMember: false,
    organization,
    role,
  };
};

export const revokeInvite = async (inviteId, revokerId) => {
  const invite = await prisma.organizationInvite.findUnique({
    where: { id: inviteId },
    include: {
      organization: true,
    },
  });

  if (!invite) {
    throw new Error('Invite not found');
  }

  const revoker = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: revokerId,
        organizationId: invite.organizationId,
      },
    },
    include: {
      role: true,
    },
  });

  const isOwner = invite.organization.ownerId === revokerId;
  const isAdmin = revoker?.role.name === 'Admin';

  if (!isOwner && !isAdmin) {
    throw new Error('Only Org Owners and Admins can revoke invites');
  }

  await prisma.organizationInvite.update({
    where: { id: inviteId },
    data: { isRevoked: true },
  });

  logger.info('Invite revoked', { inviteId, revokerId });
};

export const getOrganizationInvites = async(organizationId)=>{

   const invites = await prisma.organizationInvite.findMany({
    where: {
      organizationId,
      isRevoked: false,
    },
    include: {
      inviter: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      role: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return invites;
}