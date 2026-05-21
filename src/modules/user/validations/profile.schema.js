import { z } from 'zod';

export const setupProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name cannot exceed 100 characters'),
});

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name cannot exceed 100 characters')
    .optional(),

  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional().or(z.literal('')),

  location: z
    .string()
    .max(100, 'Location cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
});
