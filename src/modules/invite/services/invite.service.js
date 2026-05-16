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
    },
  });

  if (!inviter) {
    throw new Error('Inviter not found in organization');
  }

  const isOwner = inviter.organization.ownerId === inviterId;
  const isAdmin = inviter.role.name === 'Admin';

  if (!isOwner && !isAdmin) {
    throw new Error('Only Org Owners and Admins can generate invite links');
  }

  const role = await prisma.role.findFirst({
    where: {
      id: roleId,
      organizationId,
    },
  });

  if (!role) {
    throw new Error('Invalid role for this organization');
  }

  if (projectIds.length > 0) {
    const projects = await prisma.project.findMany({
      where: {
        id: { in: projectIds },
        organizationId,
      },
    });

    if (projects.length !== projectIds.length) {
      throw new Error('One or more projects not found in organization');
    }
  }

  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const invite = await prisma.organizationInvite.create({
    data: {
      organizationId,
      inviterId,
      roleId,
      projectIds,
      email,
      isMultiUse,
      expiresAt,
    },
  });

  const tokenPayload = {
    inviteId: invite.id,
    orgId: organizationId,
    roleId,
    projectIds,
    inviterId,
    expiresAt: expiresAt.getTime(),
  };

  // const token = encodeInviteToken(tokenPayload);
  const inviteUrl = `${config.frontendUrl}/invite/${token}`;

  await prisma.organizationInvite.update({
    where: { id: invite.id },
    data: { token },
  });

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
