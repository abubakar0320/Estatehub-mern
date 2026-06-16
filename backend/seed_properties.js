// Seed script: adds 30 realistic Pakistani real estate properties
// Run: node seed_properties.js
import mongoose from 'mongoose';
import PropertyCategory from './src/models/propertyCategory.model.js';
import Property from './src/models/property.model.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/estatehub';

const categories = [
  { name: 'House',      description: 'Standalone residential houses' },
  { name: 'Apartment',  description: 'Flats and apartment units' },
  { name: 'Commercial', description: 'Office spaces and commercial properties' },
  { name: 'Villa',      description: 'Luxury villas and farmhouses' },
  { name: 'Plot',       description: 'Residential and commercial plots' },
];

const imgs = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
  'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
];
const gi = (i) => imgs[i % imgs.length];
const uid = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const slug = (t) => t.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

const propData = [
  { title:'Modern 5-Marla House in DHA Phase 5', city:'Lahore', area:'DHA Phase 5', type:'Sale', price:28500000, bed:3, bath:2, kit:1, sz:'5 Marla', cat:'House', feat:true, feats:['Marble Flooring','Front Lawn','Car Parking'], amen:['24/7 Security','CCTV'], desc:'A beautifully designed 5-marla house in DHA Phase 5. Spacious rooms and a serene front lawn. Ideal for a small family.' },
  { title:'Luxury 10-Marla Villa in Bahria Town', city:'Lahore', area:'Bahria Town', type:'Sale', price:65000000, bed:5, bath:4, kit:2, sz:'10 Marla', cat:'Villa', feat:true, feats:['Swimming Pool','Home Theater','Rooftop Garden'], amen:['Gated Community','Club Access','Gym'], desc:'Stunning luxury villa in Bahria Town with smart home automation, private pool, and premium landscaping.' },
  { title:'Spacious 3-BHK Apartment in Gulberg', city:'Lahore', area:'Gulberg III', type:'Rent', price:85000, bed:3, bath:2, kit:1, sz:'1800 Sq Ft', cat:'Apartment', feat:false, feats:['Balcony','Central AC','Modular Kitchen'], amen:['24/7 Security','Parking'], desc:'Prime apartment in Gulberg III with all modern amenities. Walking distance to major restaurants and banks.' },
  { title:'Commercial Office Floor in MM Alam Road', city:'Lahore', area:'MM Alam Road', type:'Rent', price:250000, bed:0, bath:4, kit:1, sz:'4000 Sq Ft', cat:'Commercial', feat:false, feats:['Open Floor Plan','Conference Rooms','Fiber Internet'], amen:['Central AC','Parking'], desc:'Full commercial floor on the prestigious MM Alam Road. Ideal for corporate offices or co-working hubs.' },
  { title:'1-Kanal Dream Home in Garden Town', city:'Lahore', area:'Garden Town', type:'Sale', price:95000000, bed:6, bath:5, kit:2, sz:'1 Kanal', cat:'House', feat:true, feats:['Double Story','Lawn & Garden','Servant Quarter','Solar System'], amen:['Generator','Intercom'], desc:'Grandeur 1-kanal double-storey home in Garden Town with solar energy and beautifully landscaped garden.' },
  { title:'Studio Apartment near Wapda Town', city:'Lahore', area:'Wapda Town', type:'Rent', price:35000, bed:1, bath:1, kit:1, sz:'650 Sq Ft', cat:'Apartment', feat:false, feats:['Fully Furnished','WiFi Included'], amen:['Security Guard','CCTV'], desc:'Compact and fully furnished studio apartment, perfect for students or working professionals.' },
  { title:'7-Marla Corner House in Johar Town', city:'Lahore', area:'Johar Town', type:'Sale', price:37000000, bed:4, bath:3, kit:1, sz:'7 Marla', cat:'House', feat:false, feats:['Corner Plot','Double Storey','Car Porch'], amen:['WASA Connection','Sui Gas'], desc:'Corner plot house in Phase 2, Johar Town. Recently renovated with new tiles and paint throughout.' },
  { title:'Penthouse Apartment in DHA Phase 6', city:'Lahore', area:'DHA Phase 6', type:'Sale', price:45000000, bed:4, bath:3, kit:1, sz:'2800 Sq Ft', cat:'Apartment', feat:true, feats:['Rooftop Terrace','Panoramic Views','Jacuzzi'], amen:['Concierge','Gym','Pool'], desc:'Exclusive penthouse with breathtaking city views, Italian marble, and a private rooftop terrace.' },
  { title:'Brand New 10-Marla House in F-7/1', city:'Islamabad', area:'F-7/1', type:'Sale', price:120000000, bed:5, bath:4, kit:2, sz:'10 Marla', cat:'House', feat:true, feats:['Basement','Home Automation','Solar Panels'], amen:['Generator Backup','CCTV'], desc:'Newly constructed home in F-7/1. Features a basement, servant quarters, and premium European fittings.' },
  { title:'Modern Apartment in Blue Area', city:'Islamabad', area:'Blue Area', type:'Rent', price:120000, bed:2, bath:2, kit:1, sz:'1400 Sq Ft', cat:'Apartment', feat:false, feats:['City View','Central AC','Elevator'], amen:['24/7 Security','Parking','Gym'], desc:'Centrally located apartment with stunning views of Islamabad. Close to commercial centers and offices.' },
  { title:'Luxury Villa in Bahria Phase 7', city:'Islamabad', area:'Bahria Phase 7', type:'Sale', price:145000000, bed:6, bath:6, kit:2, sz:'1 Kanal', cat:'Villa', feat:true, feats:['Private Pool','Home Theater','Landscaped Garden'], amen:['Gated Community','Club House'], desc:'Ultra-luxury villa in Bahria Phase 7 — a masterpiece of architecture with world-class interior design.' },
  { title:'Commercial Plaza in I-8 Markaz', city:'Islamabad', area:'I-8 Markaz', type:'Sale', price:85000000, bed:0, bath:6, kit:0, sz:'5000 Sq Ft', cat:'Commercial', feat:false, feats:['Multiple Shops','Wide Frontage','High Foot Traffic'], amen:['Parking','CCTV'], desc:'Prime commercial plaza in I-8 Markaz. Suitable for retail, bank, or showroom.' },
  { title:'2-Bedroom Apartment in E-11', city:'Islamabad', area:'E-11/4', type:'Rent', price:75000, bed:2, bath:2, kit:1, sz:'1100 Sq Ft', cat:'Apartment', feat:false, feats:['Balcony','Wooden Flooring','Storage Room'], amen:['Generator','Parking'], desc:'Tastefully furnished apartment in E-11/4. Close to schools, parks, and expressway access.' },
  { title:'Corner Plot 8-Marla in G-13', city:'Islamabad', area:'G-13/1', type:'Sale', price:22000000, bed:0, bath:0, kit:0, sz:'8 Marla', cat:'Plot', feat:false, feats:['Facing Park','60-Foot Road'], amen:[], desc:'Excellent corner plot facing a park in G-13/1 Islamabad. Great investment opportunity.' },
  { title:'Luxury Apartment in Clifton Block 5', city:'Karachi', area:'Clifton Block 5', type:'Rent', price:200000, bed:4, bath:3, kit:1, sz:'3000 Sq Ft', cat:'Apartment', feat:true, feats:['Sea View','Private Elevator','Marble Floors','Jacuzzi'], amen:['Gym','Pool','Valet Parking'], desc:'World-class apartment in Clifton Block 5 with a stunning sea view and 24/7 concierge service.' },
  { title:'500 Sqyd Bungalow in DHA Phase 8', city:'Karachi', area:'DHA Phase 8', type:'Sale', price:185000000, bed:6, bath:6, kit:2, sz:'500 Sq Yd', cat:'Villa', feat:true, feats:['Private Pool','Cinema Room','Gym','Servant Block'], amen:['CCTV','Generator','Water Tank'], desc:'Statement-making bungalow in DHA Phase 8 — the most prestigious address in Karachi.' },
  { title:'Commercial Unit near Dolmen Mall Clifton', city:'Karachi', area:'Clifton', type:'Rent', price:350000, bed:0, bath:2, kit:0, sz:'2200 Sq Ft', cat:'Commercial', feat:false, feats:['Premium Location','Mall Access','Central AC'], amen:['Mall Security','Parking'], desc:'Highly sought-after commercial space near Dolmen Mall. Perfect for retail, restaurant, or showroom.' },
  { title:'Cozy 2-Bed Apartment in Gulshan-e-Iqbal', city:'Karachi', area:'Gulshan Block 13D', type:'Rent', price:45000, bed:2, bath:2, kit:1, sz:'900 Sq Ft', cat:'Apartment', feat:false, feats:['AC Installed','Tiled Floors'], amen:['Security Guard','Intercom'], desc:'Clean and well-maintained apartment. Close to schools, hospitals, and main roads.' },
  { title:'240 Sqyd House in North Nazimabad', city:'Karachi', area:'North Nazimabad Block H', type:'Sale', price:42000000, bed:4, bath:3, kit:1, sz:'240 Sq Yd', cat:'House', feat:false, feats:['Corner Plot','Double Storey','Basement'], amen:['UPS','Generator'], desc:'Well-maintained double-storey house on a corner plot in a well-established neighborhood.' },
  { title:'Studio Flat in DHA Phase 2 Extension', city:'Karachi', area:'DHA Phase 2 Ext', type:'Rent', price:55000, bed:1, bath:1, kit:1, sz:'600 Sq Ft', cat:'Apartment', feat:false, feats:['Furnished','Parking Spot'], amen:['Security','CCTV'], desc:'Compact furnished studio in DHA Phase 2. Ideal for a single professional or couple.' },
  { title:'5-Marla House in Bahria Town Rawalpindi', city:'Rawalpindi', area:'Bahria Town Phase 4', type:'Sale', price:18500000, bed:3, bath:2, kit:1, sz:'5 Marla', cat:'House', feat:false, feats:['Marble Floors','Gas Connection','Car Porch'], amen:['24/7 Security'], desc:'Affordable and well-designed home in Bahria Town Phase 4 Rawalpindi. Ready for possession.' },
  { title:'Office Space in Saddar Commercial Area', city:'Rawalpindi', area:'Saddar', type:'Rent', price:80000, bed:0, bath:2, kit:0, sz:'1500 Sq Ft', cat:'Commercial', feat:false, feats:['Reception Area','Meeting Room','Server Room'], amen:['Elevators','Parking'], desc:'Fully fitted office space in the commercial hub of Saddar Rawalpindi.' },
  { title:'10-Marla Plot in DHA Phase 2', city:'Rawalpindi', area:'DHA Phase 2', type:'Sale', price:34000000, bed:0, bath:0, kit:0, sz:'10 Marla', cat:'Plot', feat:false, feats:['Facing Park','Transfer Ready'], amen:[], desc:'Prime 10-marla plot on 40-foot road in DHA Phase 2. Excellent for construction or investment.' },
  { title:'Waterfront Penthouse in Emaar Crescent Bay', city:'Karachi', area:'Emaar Crescent Bay', type:'Sale', price:350000000, bed:5, bath:5, kit:2, sz:'5000 Sq Ft', cat:'Apartment', feat:true, feats:['Sea View','Private Terrace','Smart Home'], amen:['Beach Access','Infinity Pool','Concierge'], desc:'Once-in-a-lifetime luxury penthouse in Emaar Crescent Bay with sweeping Arabian Sea views.' },
  { title:'Farmhouse on Bedian Road Lahore', city:'Lahore', area:'Bedian Road', type:'Sale', price:75000000, bed:4, bath:4, kit:2, sz:'4 Kanal', cat:'Villa', feat:true, feats:['Orchard','Swimming Pool','Staff Quarters'], amen:['Solar System','Generator'], desc:'Expansive farmhouse on 4 kanal in the green belt of Lahore with orchard and swimming pool.' },
  { title:'Ground Floor Shop in Fortress Square', city:'Lahore', area:'Cantt', type:'Rent', price:150000, bed:0, bath:1, kit:0, sz:'800 Sq Ft', cat:'Commercial', feat:false, feats:['Mall Location','Air Conditioned','Signage Allowed'], amen:['Mall Security','Parking'], desc:'Prime retail space in Fortress Square, one of Lahore\'s most popular shopping destinations.' },
  { title:'3-Marla House in Valencia Town', city:'Lahore', area:'Valencia Housing Society', type:'Sale', price:12500000, bed:2, bath:2, kit:1, sz:'3 Marla', cat:'House', feat:false, feats:['Ground Floor','Gas Connection'], amen:['Society Security'], desc:'Budget-friendly 3-marla house in Valencia Town. Perfect first home or investment opportunity.' },
  { title:'High-Rise Apartment in Centaurus', city:'Islamabad', area:'F-8', type:'Sale', price:55000000, bed:3, bath:3, kit:1, sz:'2200 Sq Ft', cat:'Apartment', feat:true, feats:['Mall Below','City Views','Smart Home'], amen:['Indoor Pool','Gym','Rooftop Terrace'], desc:'Prestigious apartment in The Centaurus with panoramic views of the Margalla Hills.' },
  { title:'1-Kanal Plot in Gulraiz Housing Society', city:'Rawalpindi', area:'Gulraiz Phase 2', type:'Sale', price:9500000, bed:0, bath:0, kit:0, sz:'1 Kanal', cat:'Plot', feat:false, feats:['Possession Available','Corner Plot'], amen:[], desc:'Ready-for-construction 1-kanal corner plot in Gulraiz Housing Society Phase 2.' },
  { title:'4-BHK Luxury Apartment in Creek Vista', city:'Karachi', area:'DHA Creek Vista', type:'Rent', price:175000, bed:4, bath:4, kit:1, sz:'3500 Sq Ft', cat:'Apartment', feat:false, feats:['Creek View','Private Gym','Maid Room'], amen:['Pool','Tennis Court','24/7 Security'], desc:'Sprawling luxury apartment with stunning Creek views in DHA Creek Vista.' },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const catDocs = {};
  for (const cat of categories) {
    let doc = await PropertyCategory.findOne({ name: cat.name });
    if (!doc) doc = await PropertyCategory.create(cat);
    catDocs[cat.name] = doc._id;
    console.log(`📁 Category ready: ${cat.name}`);
  }

  let added = 0;
  for (let i = 0; i < propData.length; i++) {
    const p = propData[i];
    const exists = await Property.findOne({ title: p.title });
    if (exists) { console.log(`⏭️  Skip: ${p.title}`); continue; }

    // Use insertMany-style direct insert to bypass pre-save hook issues
    await Property.collection.insertOne({
      title:         p.title,
      slug:          slug(p.title),
      description:   p.desc,
      price:         p.price,
      type:          p.type,
      status:        'Available',
      bedrooms:      p.bed,
      bathrooms:     p.bath,
      kitchens:      p.kit,
      area_size:     p.sz,
      area_unit:     'Sq Ft',
      city:          p.city,
      location_area: p.area,
      main_image:    gi(i),
      gallery:       [],
      features:      p.feats || [],
      amenities:     p.amen || [],
      agent_id:      null,
      category_id:   catDocs[p.cat],
      is_featured:   p.feat,
      property_code: 'EST-' + uid(),
      views_count:   Math.floor(Math.random() * 500),
      created_at:    new Date(),
      updated_at:    new Date(),
    });
    console.log(`✅ [${i + 1}/${propData.length}] Added: ${p.title}`);
    added++;
  }

  console.log(`\n🎉 Done! ${added} properties added to MongoDB.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(e => { console.error('❌ Seed failed:', e.message); process.exit(1); });
