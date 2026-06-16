import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  lease_start: { type: Date },
  lease_end: { type: Date },
  monthly_rent: { type: Number, default: 0.00 },
  status: { type: String, default: 'Active' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;
