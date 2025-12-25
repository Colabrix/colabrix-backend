import { httpResponse, asyncHandler, responseMessage } from '../../../shared/index.js';
import * as authService from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await authService.registerUser({ email, phone, password });

  return httpResponse(req, res, 201, responseMessage.custom('Registration successful. Please check your email to verify your account'), user);
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const user = await authService.verifyEmail(token);

  return httpResponse(req, res, 200, responseMessage.custom('Email verified successfully'), {
    id: user.id,
    email: user.email,
    isEmailVerified: true,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser({ email, password });

  return httpResponse(req, res, 200, responseMessage.custom('Login successful'), result);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.requestPasswordReset(email);

  return httpResponse(req, res, 200, responseMessage.custom('If the email exists, a password reset link has been sent'), null);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  await authService.resetPassword({ token, password });

  return httpResponse(req, res, 200, responseMessage.custom('Password reset successfully'), null);
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  await authService.changePassword({ userId, currentPassword, newPassword });

  return httpResponse(req, res, 200, responseMessage.custom('Password changed successfully'), null);
});

export const logout = asyncHandler(async (req, res) => {
  const sessionId = req.sessionId;

  await authService.logoutUser(sessionId);

  return httpResponse(req, res, 200, responseMessage.custom('Logged out successfully'), null);
});

export const logoutAllDevices = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  await authService.logoutAllDevices(userId);

  return httpResponse(req, res, 200, responseMessage.custom('Logged out from all devices'), null);
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await authService.getUserProfile(userId);

  return httpResponse(req, res, 200, responseMessage.custom('User profile retrieved successfully'), user);
});
