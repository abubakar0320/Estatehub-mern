import express from 'express';
import { getBookings, addBooking, updateBooking } from '../controllers/booking.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getBookings);
router.post('/', addBooking);
router.put('/:id', protect, authorize('admin'), updateBooking);

export default router;
