import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import { autoSeed } from './autoSeed.js';

dotenv.config();

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
      
      // Auto-seed if database is empty (Runs on Atlas too)
      await autoSeed();
      
      return;
    } catch (e) {
      if (process.env.NODE_ENV === 'production') throw e;

      console.log(`ℹ️ Local MongoDB not found. Starting embedded MongoDB Memory Server...`);
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`✅ Connected to Embedded MongoDB Database (EstateHub): ${conn.connection.host}`);
      await autoSeed();
    }
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
