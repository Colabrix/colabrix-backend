import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(100),
  planType: z.enum(['FREE', 'STANDARD', 'PREMIUM', 'ENTERPRISE']).optional(),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  imageUrl: z.string().url().optional(),
});

export const addMemberSchema = z.object({
  userId: z.string().cuid(),
  roleId: z.string().cuid(),
});

export const updateMemberRoleSchema = z.object({
  roleId: z.string().cuid(),
});

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(50),
  description: z.string().max(200).optional(),
  permissionIds: z.array(z.string().cuid()).optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(200).optional(),
});

export const updateRolePermissionsSchema = z.object({
  permissionIds: z.array(z.string().cuid()),
});
