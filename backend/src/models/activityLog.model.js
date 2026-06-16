import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
