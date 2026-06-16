import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from '../models/user.model.js';
import Agent from '../models/agent.model.js';
import Property from '../models/property.model.js';
import PropertyCategory from '../models/propertyCategory.model.js';

dotenv.config();

// Function to seed full data
const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({ username: 'admin', email: 'admin@estatehub.com', password: hashedPassword, role: 'admin' });
      console.log('✅ Admin user automatically seeded (admin / admin)');
    }

    const agentCount = await Agent.countDocuments();
    let seededAgents = [];
    if (agentCount === 0) {
      seededAgents = await Agent.insertMany([
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
    }

    const categoryCount = await PropertyCategory.countDocuments();
    let seededCategories = [];
    if (categoryCount === 0) {
      seededCategories = await PropertyCategory.insertMany([
        { name: 'Villa', description: 'Luxury detached houses' },
        { name: 'Apartment', description: 'Modern residential units' },
        { name: 'Office', description: 'Commercial workspaces' }
      ]);
      console.log('✅ Categories seeded');
    }

    const propertyCount = await Property.countDocuments();
    if (propertyCount === 0 && seededAgents.length > 0 && seededCategories.length > 0) {
      await Property.insertMany([
        {
          title: 'Luxury Villa in DHA',
          price: 75000000,
          type: 'Sale',
          status: 'Available',
          location_area: 'Phase 6',
          city: 'Lahore',
          category_id: seededCategories[0]._id,
          bedrooms: 5,
          area_size: '1 Kanal',
          description: 'Elite lifestyle in the heart of DHA.',
          agent_id: seededAgents[0]._id,
          main_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Modern Apartment',
          price: 12000000,
          type: 'Rent',
          status: 'Available',
          location_area: 'Gulberg',
          city: 'Lahore',
          category_id: seededCategories[1]._id,
          bedrooms: 2,
          area_size: '1200 Sq Ft',
          description: 'Perfect for small families.',
          agent_id: seededAgents[1]._id,
          main_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
        }
      ]);
      console.log('✅ Properties seeded');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    let uri = process.env.MONGODB_URI;
    
    if (!uri && process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI is not defined in production');
    }

    try {
      const conn = await mongoose.connect(uri, { 
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log(`✅ Connected to MongoDB Database (EstateHub): ${conn.connection.host}`);
      
      // Seed data only if not in production or explicitly requested
      if (process.env.NODE_ENV !== 'production') {
        await seedData();
      }
      return;
    } catch (e) {
      if (process.env.NODE_ENV === 'production') throw e;

      console.log(`ℹ️ Local MongoDB not found. Starting embedded MongoDB Memory Server...`);
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`✅ Connected to Embedded MongoDB Database (EstateHub): ${conn.connection.host}`);
      await seedData();
    }
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
