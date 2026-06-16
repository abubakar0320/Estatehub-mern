import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
import agentRoutes from './routes/agent.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import categoryRoutes from './routes/category.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import activityRoutes from './routes/activity.routes.js';
import contactRoutes from './routes/contact.routes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route for Debugging
app.get('/', (req, res) => {
  res.send('<h1>EstateHub API is LIVE</h1><p>Use <b>/api/health</b> to check data status.</p>');
});

// Static files
const uploadsPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsPath) && process.env.NODE_ENV !== 'production') {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Core API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/contact', contactRoutes);

import Property from './models/property.model.js';

import { autoSeed } from './config/autoSeed.js';

// Manual Data Restoration Trigger
app.get('/api/force-seed', async (req, res) => {
  try {
    // Clear existing if any (optional, but ensures fresh start)
    // await Property.deleteMany({});
    const result = await autoSeed();
    res.json({ 
      message: 'Restoration process completed', 
      detail: result 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const count = await Property.countDocuments();
    res.json({ 
      status: 'active', 
      system: 'EstateHub MERN API', 
      database: 'Connected',
      property_count: count,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 EstateHub API Orchestrator running on port ${PORT}`);
  });
}

export default app;
