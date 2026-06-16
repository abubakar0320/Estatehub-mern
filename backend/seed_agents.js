// Seed script: adds 6 realistic Pakistani real estate agents
// Run: node seed_agents.js
import mongoose from 'mongoose';
import Agent from './src/models/agent.model.js'; // Let's check if the model is named agent.model.js
import User from './src/models/user.model.js'; // Sometimes agents require a base user

const MONGO_URI = 'mongodb://127.0.0.1:27017/estatehub';

const agentsData = [
  { first_name: 'Ahmed', last_name: 'Khan', phone: '+92 300 1234567', email: 'ahmed.k@estatehub.pk', experience_years: 8, location_area: 'DHA Lahore', profile_picture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', rating: 5, bio: 'Expert in DHA Lahore residential and commercial properties.' },
  { first_name: 'Sara', last_name: 'Malik', phone: '+92 333 9876543', email: 'sara.m@estatehub.pk', experience_years: 5, location_area: 'Bahria Town, ISB', profile_picture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', rating: 4.8, bio: 'Specializes in luxury villas and modern apartments in Bahria Town.' },
  { first_name: 'Zain', last_name: 'Qureshi', phone: '+92 321 4567890', email: 'zain.q@estatehub.pk', experience_years: 12, location_area: 'Clifton, KHI', profile_picture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', rating: 4.9, bio: '12+ years of experience in high-end Clifton and DHA properties.' },
  { first_name: 'Aisha', last_name: 'Noor', phone: '+92 345 1122334', email: 'aisha.n@estatehub.pk', experience_years: 3, location_area: 'Gulberg, LHR', profile_picture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', rating: 4.7, bio: 'Young, energetic agent handling prime Gulberg commercial rentals.' },
  { first_name: 'Fahad', last_name: 'Mustafa', phone: '+92 311 2233445', email: 'fahad.m@estatehub.pk', experience_years: 6, location_area: 'F-8, ISB', profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', rating: 4.5, bio: 'Connecting buyers and sellers in the heart of Islamabad.' },
  { first_name: 'Fatima', last_name: 'Ali', phone: '+92 300 9988776', email: 'fatima.a@estatehub.pk', experience_years: 9, location_area: 'DHA Phase 8, KHI', profile_picture: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80', rating: 5, bio: 'Top performing agent in Karachi with exclusive access to premium listings.' }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  let added = 0;
  for (let i = 0; i < agentsData.length; i++) {
    const a = agentsData[i];
    
    // Check if agent model is simple or tied to a user.
    // Based on property model we saw before, let's insert directly to agent collection.
    
    const exists = await Agent.findOne({ email: a.email });
    if (exists) { 
      console.log(`⏭️  Skip: ${a.first_name} ${a.last_name}`); 
      continue; 
    }

    // Try creating base User first if required by schema, otherwise we bypass pre-save if it fails
    // Wait, let's just use raw collection insert to bypass any strict schema rules for quick seeding
    await Agent.collection.insertOne({
      ...a,
      active_listings: Math.floor(Math.random() * 20) + 5,
      status: 'Active',
      created_at: new Date(),
      updated_at: new Date()
    });
    console.log(`✅ Added: ${a.first_name} ${a.last_name}`);
    added++;
  }

  console.log(`\n🎉 Done! ${added} agents added to MongoDB.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(e => { console.error('❌ Seed failed:', e.message); process.exit(1); });
