import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: String, enum: ['Rent', 'Sale'], required: true },
  status: { type: String, default: 'Available' },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  kitchens: { type: Number, default: 0 },
  area_size: { type: String },
  area_unit: { type: String, default: 'Sq Ft' },
  city: { type: String, required: true },
  location_area: { type: String, required: true },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  main_image: { type: String, default: 'default_property.png' },
  gallery: [{ type: String }],
  features: [{ type: String }],
  amenities: [{ type: String }],
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyCategory' },
  is_featured: { type: Boolean, default: false },
  property_code: { type: String, unique: true },
  views_count: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Middleware to generate slug before saving
propertySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().split(' ').join('-') + '-' + Math.random().toString(36).substring(2, 7);
  }
  if (!this.property_code) {
    this.property_code = 'EST-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
