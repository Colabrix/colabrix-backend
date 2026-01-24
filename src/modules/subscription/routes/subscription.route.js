import express from 'express';
import {
  health,
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} from '../controllers/plan.controller.js';
import {
  getSubscription,
  createCheckout,
  verifyPayment,
  cancelSubscription,
  webhook,
} from '../controllers/subscription.controller.js';
import { authenticate, validateRequest } from '../../../shared/index.js';
import { requireSuperAdmin, requirePermission } from '../../../shared/middleware/authorization.js';
import {
  createPlanSchema,
  updatePlanSchema,
  createCheckoutSchema,
  cancelSubscriptionSchema,
} from '../validations/subscription.schema.js';

const router = express.Router();

router.get('/health', health);

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

router.get('/plans', getPlans);
router.get('/plans/:planId', getPlan);

router.use(authenticate);

router.post('/admin/plans', requireSuperAdmin, validateRequest(createPlanSchema, 'body'), createPlan);
router.patch(
  '/admin/plans/:planId',
  requireSuperAdmin,
  validateRequest(updatePlanSchema, 'body'),
  updatePlan
);
router.delete('/admin/plans/:planId', requireSuperAdmin, deletePlan);

router.get(
  '/organizations/:organizationId',
  requirePermission('organizations', 'read'),
  getSubscription
);

router.post('/checkout', validateRequest(createCheckoutSchema, 'body'), createCheckout);

router.get('/verify', verifyPayment);

router.post(
  '/cancel',
  validateRequest(cancelSubscriptionSchema, 'body'),
  requirePermission('organizations', 'update'),
  cancelSubscription
);

export default router;
