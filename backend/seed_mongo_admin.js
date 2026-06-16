import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

import User from './src/models/user.model.js';
import Agent from './src/models/agent.model.js';
import Property from './src/models/property.model.js';
import PropertyCategory from './src/models/propertyCategory.model.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Seeding database...');

    // 1. Clear existing data
    await User.deleteMany({});
    await Agent.deleteMany({});
    await Property.deleteMany({});
    await PropertyCategory.deleteMany({});

    // 2. Seed Admin
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@estatehub.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created');

    // 3. Seed Agents
    const agents = await Agent.insertMany([
      {
        full_name: 'Sumaira Ghazal',
        email: 'sumaira@example.com',
        cell_no: '0300-1234567',
        operational_area: 'DHA Phase 6, Lahore',
        rating: 5.0,
        experience: 8,
        specialization: 'Residential',
        status: 'Available',
        bio: 'Top rated specialist in DHA.',
        profile_image: 'https://ui-avatars.com/api/?name=Sumaira+Ghazal&background=198754&color=fff'
      },
      {
        full_name: 'Ahmed Ali',
        email: 'ahmed@example.com',
        cell_no: '0321-7654321',
        operational_area: 'Gulberg, Lahore',
        rating: 4.8,
        experience: 5,
        specialization: 'Commercial',
        status: 'Available',
        bio: 'Expert in commercial properties.',
        profile_image: 'https://i.pravatar.cc/150?u=ahmed'
      }
    ]);
    console.log('✅ Agents seeded');

    // 4. Seed Categories
    const categories = await PropertyCategory.insertMany([
      { name: 'Villa', description: 'Luxury detached houses' },
      { name: 'Apartment', description: 'Modern residential units' },
      { name: 'Office', description: 'Commercial workspaces' }
    ]);
    console.log('✅ Categories seeded');

    // 5. Seed Properties
    await Property.insertMany([
      {
        title: 'Luxury Villa in DHA',
        price: 75000000,
        type: 'Sale',
        status: 'Available',
        location_area: 'Phase 6',
        city: 'Lahore',
        category_id: categories[0]._id,
        bedrooms: 5,
        area_size: '1 Kanal',
        description: 'Elite lifestyle in the heart of DHA.',
        agent_id: agents[0]._id,
        main_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Modern Apartment',
        price: 12000000,
        type: 'Rent',
        status: 'Available',
        location_area: 'Gulberg',
        city: 'Lahore',
        category_id: categories[1]._id,
        bedrooms: 2,
        area_size: '1200 Sq Ft',
        description: 'Perfect for small families.',
        agent_id: agents[1]._id,
        main_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
      }
    ]);
    console.log('✅ Properties seeded');

    console.log('✨ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
