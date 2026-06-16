import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  invoice_number: { type: String, required: true, unique: true },
  amount_paid: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  billing_month: { type: String, required: true },
  payment_method: { type: String, default: 'Cash' },
  notes: { type: String },
  payment_status: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Partial'], default: 'Pending' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
