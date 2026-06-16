import Property from '../models/property.model.js';
import ActivityLog from '../models/activityLog.model.js';

// Public: Get all properties with professional filters
export const getProperties = async (req, res) => {
  const { city, type, category_id, search, minPrice, maxPrice, bedrooms, bathrooms, is_featured } = req.query;
  
  const query = {};
  if (city) query.city = city;
  if (type) query.type = type;
  if (category_id) query.category_id = category_id;
  if (is_featured) query.is_featured = is_featured === 'true';
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (bedrooms) query.bedrooms = Number(bedrooms);
  if (bathrooms) query.bathrooms = Number(bathrooms);

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { location_area: new RegExp(search, 'i') },
      { property_code: new RegExp(search, 'i') }
    ];
  }

  try {
    const properties = await Property.find(query)
      .populate('category_id', 'name')
      .sort({ created_at: -1 });

    const mappedProperties = properties.map(p => {
      const doc = p.toObject();
      return {
        ...doc,
        id: doc._id,
        category_name: doc.category_id ? doc.category_id.name : null
      };
    });

    res.json(mappedProperties);
  } catch (error) {
    console.error('Get Properties Error:', error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// Public: Get single property details (with view increment)
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    // Increment view count
    const property = await Property.findByIdAndUpdate(id, { $inc: { views_count: 1 } }, { new: true })
      .populate('category_id', 'name')
      .populate('agent_id', 'full_name cell_no email profile_image');

    if (!property) return res.status(404).json({ message: 'Property not found' });

    const doc = property.toObject();
    const mappedProperty = {
      ...doc,
      id: doc._id,
      category_name: doc.category_id ? doc.category_id.name : null,
      agent_name: doc.agent_id ? doc.agent_id.full_name : 'Agent Unassigned',
      agent_phone: doc.agent_id ? doc.agent_id.cell_no : null,
      agent_email: doc.agent_id ? doc.agent_id.email : null,
      agent_image: doc.agent_id ? doc.agent_id.profile_image : null
    };

    res.json(mappedProperty);
  } catch (error) {
    console.error('Get Property By ID Error:', error);
    res.status(500).json({ message: 'Error fetching property details' });
  }
};

// Admin: Add new property (Professional Entry)
export const addProperty = async (req, res) => {
  const { 
    title, price, type, status, location_area, city, category_id, 
    bedrooms, bathrooms, kitchens, area_size, area_unit, 
    description, agent_id, address, latitude, longitude,
    features, amenities, is_featured
  } = req.body;
  
  const main_image = req.file ? req.file.path.replace(/\\/g, '/') : 'default_property.png';
  
  try {
    const newProperty = await Property.create({
      title, price, type, status, location_area, city, category_id, 
      bedrooms, bathrooms, kitchens, area_size, area_unit, 
      description, agent_id, main_image, address, latitude, longitude,
      features: Array.isArray(features) ? features : (features ? features.split(',') : []),
      amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(',') : []),
      is_featured: is_featured === 'true'
    });
    
    // Log activity
    if (req.user && req.user.id) {
      await ActivityLog.create({ user_id: req.user.id, action: `Onboarded Elite Asset: ${title}` });
    }
    
    res.status(201).json({ message: 'Property listing published to network', propertyId: newProperty._id });
  } catch (error) {
    console.error('Add Property Error:', error);
    res.status(500).json({ message: 'Error during property onboarding' });
  }
};

// Admin: Update property details
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    updateData.main_image = req.file.path.replace(/\\/g, '/');
  }

  // Handle array conversions if sent as strings
  if (updateData.features && typeof updateData.features === 'string') {
    updateData.features = updateData.features.split(',');
  }
  if (updateData.amenities && typeof updateData.amenities === 'string') {
    updateData.amenities = updateData.amenities.split(',');
  }

  try {
    await Property.findByIdAndUpdate(id, updateData);
    res.json({ message: 'Property identity synchronized' });
  } catch (error) {
    console.error('Update Property Error:', error);
    res.status(500).json({ message: 'Error updating asset record' });
  }
};

// Admin: Remove property listing
export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByIdAndDelete(id);
    if (property && req.user && req.user.id) {
        await ActivityLog.create({ user_id: req.user.id, action: `Purged property from network: ${property.title}` });
    }
    res.json({ message: 'Property record purged from network' });
  } catch (error) {
    console.error('Delete Property Error:', error);
    res.status(500).json({ message: 'Error removing asset record' });
  }
};
