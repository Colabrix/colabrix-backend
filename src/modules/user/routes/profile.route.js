import express from 'express';
import multer from 'multer';
import * as profileController from '../controllers/profile.controller.js';
import { authenticate } from '../../../shared/middleware/authentication.js';
import { validateRequest } from '../../../shared/middleware/validation.js';
import { setupProfileSchema, updateProfileSchema } from '../validators/profile.schema.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

router.post(
  '/profile/setup',
  authenticate,
  upload.single('avatar'),
  validateRequest(setupProfileSchema),
  profileController.setupProfile
);

router.put(
  '/profile',
  authenticate,
  upload.single('avatar'),
  validateRequest(updateProfileSchema),
  profileController.updateProfile
);

router.get('/profile/status', authenticate, profileController.getProfileStatus);

export default router;
