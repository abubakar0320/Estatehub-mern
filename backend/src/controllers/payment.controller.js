import Payment from '../models/payment.model.js';
import Tenant from '../models/tenant.model.js';

// Admin: Get financial ledger
export const getPayments = async (req, res) => {
  const { search, status } = req.query;
  
  try {
    const query = {};
    if (status) {
      query.payment_status = status;
    }

    if (search) {
      query.invoice_number = new RegExp(search, 'i');
    }

    const payments = await Payment.find(query)
      .populate({
        path: 'tenant_id',
        populate: [
          { path: 'user_id', select: 'username email' },
          { path: 'property_id', select: 'title' }
        ]
      })
      .sort({ payment_date: -1 });

    let mappedPayments = payments.map(p => {
      const doc = p.toObject();
      const user = doc.tenant_id && doc.tenant_id.user_id ? doc.tenant_id.user_id : {};
      const property = doc.tenant_id && doc.tenant_id.property_id ? doc.tenant_id.property_id : {};
      
      return {
        ...doc,
        payment_id: doc._id,
        user_name: user.username || null,
        contact_email: user.email || null,
        property_title: property.title || null
      };
    });

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      mappedPayments = mappedPayments.filter(p => 
        searchRegex.test(p.invoice_number) || 
        (p.user_name && searchRegex.test(p.user_name)) || 
        (p.property_title && searchRegex.test(p.property_title))
      );
    }

    res.json(mappedPayments);
  } catch (error) {
    console.error('Get Payments Error:', error);
    res.status(500).json({ message: 'Error fetching financial ledger' });
  }
};

// Admin: Generate invoice
export const addPayment = async (req, res) => {
  const { tenant_id, amount_paid, billing_month, payment_method, notes, payment_status } = req.body;
  const invoice_number = 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  try {
    const newPayment = await Payment.create({
      tenant_id, invoice_number, amount_paid, billing_month, payment_method, notes, payment_status
    });
    res.status(201).json({ message: 'Invoice generated successfully', paymentId: newPayment._id });
  } catch (error) {
    console.error('Add Payment Error:', error);
    res.status(500).json({ message: 'Error generating invoice' });
  }
};

// Admin: Update payment status
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount_paid, billing_month, payment_method, notes, payment_status } = req.body;
  try {
    await Payment.findByIdAndUpdate(id, {
      amount_paid, billing_month, payment_method, notes, payment_status
    });
    res.json({ message: 'Financial record synchronized' });
  } catch (error) {
    console.error('Update Payment Error:', error);
    res.status(500).json({ message: 'Error updating financial record' });
  }
};
