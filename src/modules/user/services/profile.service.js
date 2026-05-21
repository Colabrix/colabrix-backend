import { getWriteDB } from '../../../config/databases.js';
import { logger } from '../../../shared/index.js';
import { uploadFile } from '../../../shared/services/storage/upload.service.js';

const prisma = getWriteDB();

export const setupProfile = async ({ userId, displayName, avatarFile }) => {
  let avatarUrl = null;

  if (avatarFile) {
    //not written yet
    const uploadResult = await uploadFile({
      file: avatarFile,
      folder: 'avatars',
      userId,
    });
    avatarUrl = uploadResult.url;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      displayName,
      avatarUrl,
      profileCompleted: true,
      profileCompletedAt: new Date(),
    },
  });

  logger.info('User profile setup completed', { userId });

  return {
    id: user.id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    profileCompleted: user.profileCompleted,
  };
};

export const updateProfile = async ({ userId, displayName, avatarFile, bio, location }) => {
  const updateData = {};

  if (displayName !== undefined) {
    updateData.displayName = displayName;
  }

  if (bio !== undefined) {
    updateData.bio = bio;
  }

  if (location !== undefined) {
    updateData.location = location;
  }

  if (avatarFile) {
    const uploadResult = await uploadFile({
      file: avatarFile,
      folder: 'avatars',
      userId,
    });
    updateData.avatarUrl = uploadResult.url;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  logger.info('User profile updated', { userId });

  return user;
};

export const isProfileComplete = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      profileCompleted: true,
      displayName: true,
    },
  });

  return user?.profileCompleted || false;
};