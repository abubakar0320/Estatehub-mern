import ActivityLog from '../models/activityLog.model.js';

// Admin: Get recent activity
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('user_id', 'username')
      .sort({ created_at: -1 })
      .limit(10);

    const mappedLogs = logs.map(l => {
      const doc = l.toObject();
      return {
        id: doc._id,
        action: doc.action,
        user: doc.user_id ? doc.user_id.username : 'System',
        time: doc.created_at
      };
    });

    res.json(mappedLogs);
  } catch (error) {
    console.error('Get Activity Logs Error:', error);
    res.status(500).json({ message: 'Error fetching system logs' });
  }
};
