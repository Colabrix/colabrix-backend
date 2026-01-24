import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  type: z.enum(['FREE', 'STANDARD', 'PREMIUM', 'ENTERPRISE']),
  price: z.number().min(0, 'Price must be positive'),
  interval: z.enum(['month', 'year']),
  description: z.string().optional(),
});

export const updatePlanSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  interval: z.enum(['month', 'year']).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const createCheckoutSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
});

export const cancelSubscriptionSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
});
