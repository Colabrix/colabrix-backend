import { randomBytes } from 'crypto';
import { getWriteDB } from '../../../config/databases.js';
import { hashPassword, comparePassword } from '../../../shared/services/auth/password.js';
import { generateTokens } from '../../../shared/services/auth/jwt.js';
import { sendEmail } from '../../../config/email.js';
import { SessionManager } from '../../../config/redis.js';
import { logger } from '../../../shared/index.js';
import config from '../../../config/index.js';
import { verifyEmailTemplate, passwordResetTemplate } from '../utils/email.utils.js';

const prisma = getWriteDB();
const sessionManager = new SessionManager();

export const registerUser = async ({ email, phone, password }) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, ...(phone ? [{ phone }] : [])],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error('Email already registered');
    }
    if (phone && existingUser.phone === phone) {
      throw new Error('Phone number already registered');
    }
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      phone,
      password: hashedPassword,
    },
  });

  const verificationToken = randomBytes(32).toString('hex');

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)),
    },
  });

  const verificationUrl = `${config.frontendUrl}/verify-email?token=${verificationToken}`;

  await sendEmail({
    to: email,
    subject: 'Verify your Colabrix account',
    html: verifyEmailTemplate(verificationUrl),
  });

  logger.info('User registered successfully', { userId: user.id, email });

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    isEmailVerified: user.isEmailVerified,
  };
};

export const verifyEmail = async (token) => {
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!verificationToken || verificationToken.isUsed) {
    throw new Error('Invalid or expired verification token');
  }

  if (new Date() > verificationToken.expiresAt) {
    throw new Error('Verification token has expired');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.emailVerificationToken.update({
      where: { id: verificationToken.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    }),
  ]);

  logger.info('Email verified successfully', { userId: verificationToken.userId });

  return verificationToken.user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  if (!user.isEmailVerified) {
    throw new Error('Please verify your email before logging in');
  }

  const sessionId = await sessionManager.createSession(user.id, {
    email: user.email,
    phone: user.phone,
    isEmailVerified: user.isEmailVerified,
  }, 7 * 24 * 60 * 60);

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
    email: user.email,
    sessionId,
  });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
    },
  });

  logger.info('User logged in successfully', { userId: user.id, sessionId });

  return {
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken,
    refreshToken,
    sessionId,
  };
};

export const requestPasswordReset = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return;
  }

  const resetToken = randomBytes(32).toString('hex');

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: resetToken,
      expiresAt: new Date(Date.now() + (60 * 60 * 1000)),
    },
  });

  const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: email,
    subject: 'Reset your Colabrix password',
    html: passwordResetTemplate(resetUrl),
  });

  logger.info('Password reset email sent', { userId: user.id });
};

export const resetPassword = async ({ token, password }) => {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.isUsed) {
    throw new Error('Invalid or expired reset token');
  }

  if (new Date() > resetToken.expiresAt) {
    throw new Error('Reset token has expired');
  }

  const hashedPassword = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    }),
  ]);

  logger.info('Password reset successfully', { userId: resetToken.userId });
};

export const changePassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  logger.info('Password changed successfully', { userId });
};

export const logoutUser = async (sessionId) => {
  await sessionManager.deleteSession(sessionId);
  logger.info('User logged out successfully', { sessionId });
};

export const logoutAllDevices = async (userId) => {
  await sessionManager.deleteUserSessions(userId);
  logger.info('User logged out from all devices', { userId });
};

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      phone: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      createdAt: true,
      updatedAt: true,
      organizations: {
        select: {
          id: true,
          role: true,
          joinedAt: true,
          organization: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: {
          joinedAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
