import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
