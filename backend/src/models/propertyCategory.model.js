import mongoose from 'mongoose';

const propertyCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const PropertyCategory = mongoose.model('PropertyCategory', propertyCategorySchema);

export default PropertyCategory;
