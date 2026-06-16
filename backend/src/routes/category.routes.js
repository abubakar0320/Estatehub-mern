import express from 'express';
import { getCategories, addCategory } from '../controllers/category.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, authorize('admin'), addCategory);

export default router;
