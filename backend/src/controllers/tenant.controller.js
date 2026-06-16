import Tenant from '../models/tenant.model.js';
import User from '../models/user.model.js';
import Property from '../models/property.model.js';

// Admin: Get resident directory
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate('user_id', 'username email')
      .populate('property_id', 'title');

    const mappedTenants = tenants.map(t => {
      const doc = t.toObject();
      return {
        ...doc,
        id: doc._id,
        user_name: doc.user_id ? doc.user_id.username : null,
        contact_email: doc.user_id ? doc.user_id.email : null,
        property_title: doc.property_id ? doc.property_id.title : null
      };
    });

    res.json(mappedTenants);
  } catch (error) {
    console.error('Get Tenants Error:', error);
    res.status(500).json({ message: 'Error fetching resident directory' });
  }
};

// Admin: Onboard resident
export const onboardTenant = async (req, res) => {
  const { user_id, property_id, lease_start, lease_end, monthly_rent, status } = req.body;
  const profile_image = req.file ? req.file.path.replace(/\\/g, '/') : null;

  try {
    const newTenant = await Tenant.create({
      user_id, property_id, lease_start, lease_end, monthly_rent, status
    });
    
    // Update user profile image if provided
    if (profile_image) {
      await User.findByIdAndUpdate(user_id, { profile_image });
    }

    // Update property status if assigned
    if (property_id) {
        await Property.findByIdAndUpdate(property_id, { status: 'Occupied' });
    }

    res.status(201).json({ message: 'Resident successfully onboarded', tenantId: newTenant._id });
  } catch (error) {
    console.error('Onboard Tenant Error:', error);
    res.status(500).json({ message: 'Error during resident onboarding' });
  }
};

// Admin: Update resident
export const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { property_id, lease_start, lease_end, monthly_rent, status } = req.body;
  const profile_image = req.file ? req.file.path.replace(/\\/g, '/') : null;

  try {
    const tenant = await Tenant.findByIdAndUpdate(id, {
      property_id, lease_start, lease_end, monthly_rent, status
    });

    if (profile_image && tenant && tenant.user_id) {
        await User.findByIdAndUpdate(tenant.user_id, { profile_image });
    }

    res.json({ message: 'Resident record updated' });
  } catch (error) {
    console.error('Update Tenant Error:', error);
    res.status(500).json({ message: 'Error updating resident record' });
  }
};
