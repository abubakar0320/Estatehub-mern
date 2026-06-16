import express from 'express';
import { getProperties, getPropertyById, addProperty, updateProperty, deleteProperty } from '../controllers/property.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadPropertyImage } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);

router.post('/', protect, authorize('admin'), uploadPropertyImage, addProperty);
router.put('/:id', protect, authorize('admin'), uploadPropertyImage, updateProperty);
router.delete('/:id', protect, authorize('admin'), deleteProperty);

export default router;
