import { Router } from 'express';
import { healthRoutes } from './modules/health/index.js';
import { authRoutes } from './modules/auth/index.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;
