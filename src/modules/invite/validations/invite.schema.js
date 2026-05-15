import { z } from 'zod';
export const generateInviteSchema = z.object({
  roleId: z
    .string({
      required_error: 'Role ID is required',
      invalid_type_error: 'Role ID must be a string',
    })
    .min(1, 'Role ID is required'),

  projectIds: z
    .array(z.string(), {
      invalid_type_error: 'Project IDs must be an array',
    })
    .default([]),

  isMultiUse: z.boolean().default(false),

  expiresInDays: z
    .number({
      invalid_type_error: 'Expiry days must be a number',
    })
    .int('Expiry days must be an integer')
    .min(1, 'Expiry days must be at least 1')
    .max(30, 'Expiry days cannot exceed 30')
    .default(7),

  email: z
    .string()
    .email('Invalid email format')
    .nullable()
    .optional(),
});

export const validateInviteTokenSchema = z.object({
  token: z
    .string({
      required_error: 'Invite token is required',
      invalid_type_error: 'Invite token must be a string',
    })
    .min(1, 'Invite token is required'),
});