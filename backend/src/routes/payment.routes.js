import express from 'express';
import { getPayments, addPayment, updatePayment } from '../controllers/payment.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getPayments);
router.post('/', protect, authorize('admin'), addPayment);
router.put('/:id', protect, authorize('admin'), updatePayment);

export default router;
