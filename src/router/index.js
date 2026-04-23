import express from 'express';
import { healthRoutes } from '../modules/health/index.js';
import { authRoutes } from '../modules/auth/index.js';
import { organizationRoutes } from '../modules/organization/index.js';
import { subscriptionRoutes } from '../modules/subscription/index.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/organizations', organizationRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
