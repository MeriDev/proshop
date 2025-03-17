import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protectRoute, getUserProfile);

export default router;
