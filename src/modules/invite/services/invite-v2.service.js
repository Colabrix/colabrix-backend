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
  email = null,
  expiresInDays = 7,
}) => {
  const [inviter, role] = await Promise.all([
    prisma.organizationMember.findUnique({
      where: { userId_organizationId: { userId: inviterId, organizationId } },
      select: {
        role: { select: { name: true } },
        organization: { select: { ownerId: true, name: true } },
        user: { select: { email: true } },
      },
    }),
    prisma.role.findFirst({
      where: { id: roleId, organizationId },
      select: { id: true },
    }),
  ]);

  if (!inviter) {
    const error = new Error('You are not a member of this organization');
    error.statusCode = 403;
    throw error;
  }

  const isOwner = inviter.organization.ownerId === inviterId;
  const isAdmin = inviter.role.name === 'Admin';

  if (!isOwner && !isAdmin) {
    const error = new Error('Only organization owners and admins can generate invite links');
    error.statusCode = 403;
    throw error;
  }

  if (!role) {
    const error = new Error('Role not found in this organization');
    error.statusCode = 404;
    throw error;
  }

  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const invite = await prisma.organizationInvite.create({
    data: { organizationId, email, roleId, token, expiresAt },
    select: { id: true, token: true, expiresAt: true },
  });

  const inviteUrl = `${config.frontendUrl}/invite/${invite.token}`;

  if (email) {
    await sendEmail({
      to: email,
      subject: `You're invited to join ${inviter.organization.name} on Colabrix`,
      html: inviteLinkTemplate({
        organizationName: inviter.organization.name,
        inviterEmail: inviter.user.email,
        inviteUrl,
        expiresAt: invite.expiresAt,
      }),
    });
  }

  logger.info('Invite link generated', { inviteId: invite.id, organizationId, inviterId, email });

  return {
    inviteId: invite.id,
    inviteUrl,
    token: invite.token,
    expiresAt: invite.expiresAt,
  };
};

