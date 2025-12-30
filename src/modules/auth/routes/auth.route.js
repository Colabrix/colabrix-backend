import express from 'express';
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
  logoutAllDevices,
  getMe,
} from '../controllers/auth.controller.js';
import { authenticate, validateRequest } from '../../../shared/index.js';
import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../validations/auth.schema.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema, 'body'), register);
router.post('/verify-email', validateRequest(verifyEmailSchema, 'body'), verifyEmail);
router.post('/login', validateRequest(loginSchema, 'body'), login);
router.post('/forgot-password', validateRequest(forgotPasswordSchema, 'body'), forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema, 'body'), resetPassword);

router.use(authenticate);
router.get('/me', getMe);
router.post('/logout', logout);
router.post('/logout-all', logoutAllDevices);
router.post('/change-password', validateRequest(changePasswordSchema, 'body'), changePassword);

export default router;
