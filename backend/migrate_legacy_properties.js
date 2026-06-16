import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

import Property from './src/models/property.model.js';
import Agent from './src/models/agent.model.js';
import PropertyCategory from './src/models/propertyCategory.model.js';

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 Starting Property Restoration Migration...');

    // 1. Get existing agents and categories
    const agents = await Agent.find();
    const categories = await PropertyCategory.find();

    if (agents.length === 0 || categories.length === 0) {
      console.error('❌ Error: Agents or Categories missing. Please run seed_mongo_admin.js first.');
      process.exit(1);
    }

    // 2. Clear existing properties
    await Property.deleteMany({});
    console.log('🧹 Existing properties cleared');

    // 3. Reconstruct 10 Elite Properties (Recovered Data Simulation)
    const legacyProperties = [
      {
        title: 'Elite Penthouse - Lake View',
        price: 85000000,
        type: 'Sale',
        status: 'Available',
        location_area: 'DHA Phase 8',
        city: 'Karachi',
        category_id: categories.find(c => c.name === 'Apartment')?._id || categories[0]._id,
        bedrooms: 4,
        bathrooms: 4,
        area_size: '4500 Sq Ft',
        description: 'Breathtaking views of the Arabian Sea with premium finishing and smart home integration.',
        agent_id: agents[0]._id,
        main_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
        ],
        features: ['Sea View', 'Gym', 'Infinity Pool', '24/7 Security']
      },
      {
        title: 'Modern Office Block',
        price: 150000,
        type: 'Rent',
        status: 'Available',
        location_area: 'Blue Area',
        city: 'Islamabad',
        category_id: categories.find(c => c.name === 'Office')?._id || categories[2]._id,
        bedrooms: 0,
        bathrooms: 2,
        area_size: '2500 Sq Ft',
        description: 'Prime corporate location with high-speed elevators and dedicated parking.',
        agent_id: agents[1]._id,
        main_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80'
        ],
        features: ['IT Ready', 'Concierge', 'Power Backup']
      },
      {
        title: 'Spanish Villa - Golf View',
        price: 125000000,
        type: 'Sale',
        status: 'Available',
        location_area: 'Bahria Garden City',
        city: 'Islamabad',
        category_id: categories.find(c => c.name === 'Villa')?._id || categories[0]._id,
        bedrooms: 6,
        bathrooms: 7,
        area_size: '2 Kanal',
        description: 'Exquisite Spanish architecture overlooking the championship golf course.',
        agent_id: agents[0]._id,
        main_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
        ],
        features: ['Golf Course View', 'Private Garden', 'Home Theater']
      },
      {
        title: 'Downtown Studio',
        price: 45000,
        type: 'Rent',
        status: 'Occupied',
        location_area: 'Gulberg 3',
        city: 'Lahore',
        category_id: categories.find(c => c.name === 'Apartment')?._id || categories[1]._id,
        bedrooms: 1,
        bathrooms: 1,
        area_size: '600 Sq Ft',
        description: 'Cozy studio apartment in the heart of the business district.',
        agent_id: agents[1]._id,
        main_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        features: ['Furnished', 'Central AC']
      },
      {
        title: 'Heritage Mansion',
        price: 350000000,
        type: 'Sale',
        status: 'Available',
        location_area: 'Model Town',
        city: 'Lahore',
        category_id: categories.find(c => c.name === 'Villa')?._id || categories[0]._id,
        bedrooms: 8,
        bathrooms: 9,
        area_size: '4 Kanal',
        description: 'Historical landmark property with modern amenities and lush green surroundings.',
        agent_id: agents[0]._id,
        main_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        features: ['Heritage Site', 'Swimming Pool', 'Servant Quarters']
      }
    ];

    await Property.insertMany(legacyProperties);
    console.log(`✅ Successfully restored ${legacyProperties.length} elite property records.`);
    console.log('✨ Restoration Complete!');
  } catch (error) {
    console.error('❌ Migration Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrate();
