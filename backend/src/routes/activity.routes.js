import express from 'express';
import { getActivityLogs } from '../controllers/activity.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getActivityLogs);

export default router;
