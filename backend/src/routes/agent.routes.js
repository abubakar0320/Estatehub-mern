import express from 'express';
import { getAgents, addAgent, updateAgent, deleteAgent } from '../controllers/agent.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadAgentImage } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getAgents);

router.post('/', protect, authorize('admin'), uploadAgentImage, addAgent);
router.put('/:id', protect, authorize('admin'), uploadAgentImage, updateAgent);
router.delete('/:id', protect, authorize('admin'), deleteAgent);

export default router;
