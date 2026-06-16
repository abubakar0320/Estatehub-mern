import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  visitor_name: { type: String, required: true },
  visitor_email: { type: String, required: true },
  visitor_phone: { type: String, required: true },
  visit_date: { type: Date, required: true },
  visit_time: { type: String, required: true },
  notes: { type: String },
  booking_status: { type: String, default: 'Pending' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);

export default VisitBooking;
