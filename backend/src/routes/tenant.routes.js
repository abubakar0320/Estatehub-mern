import express from 'express';
import { getTenants, onboardTenant, updateTenant } from '../controllers/tenant.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadTenantImage } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getTenants);
router.post('/', protect, authorize('admin'), uploadTenantImage, onboardTenant);
router.put('/:id', protect, authorize('admin'), uploadTenantImage, updateTenant);

export default router;
