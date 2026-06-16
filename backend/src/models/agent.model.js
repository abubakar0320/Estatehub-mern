import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String },
  cell_no: { type: String, required: true },
  cnic: { type: String },
  operational_area: { type: String },
  office_address: { type: String },
  experience: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  specialization: { type: String },
  commission: { type: Number, default: 2.00 },
  status: { type: String, default: 'Available' },
  bio: { type: String },
  profile_image: { type: String, default: 'default_agent.png' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
