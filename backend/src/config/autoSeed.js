import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import Agent from '../models/agent.model.js';
import Property from '../models/property.model.js';
import PropertyCategory from '../models/propertyCategory.model.js';

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
];

const gi = (i) => imgs[i % imgs.length];
const uid = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const slug = (t) => t.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

const propData = [
  { title:'Modern 5-Marla House in DHA Phase 5', city:'Lahore', area:'DHA Phase 5', type:'Sale', price:28500000, bed:3, bath:2, kit:1, sz:'5 Marla', cat:'House', feat:true, feats:['Marble Flooring','Front Lawn','Car Parking'], amen:['24/7 Security','CCTV'], desc:'A beautifully designed 5-marla house in DHA Phase 5. Spacious rooms and a serene front lawn.' },
  { title:'Luxury 10-Marla Villa in Bahria Town', city:'Lahore', area:'Bahria Town', type:'Sale', price:65000000, bed:5, bath:4, kit:2, sz:'10 Marla', cat:'Villa', feat:true, feats:['Swimming Pool','Home Theater','Rooftop Garden'], amen:['Gated Community','Gym'], desc:'Stunning luxury villa in Bahria Town with smart home automation and private pool.' },
  { title:'Spacious 3-BHK Apartment in Gulberg', city:'Lahore', area:'Gulberg III', type:'Rent', price:85000, bed:3, bath:2, kit:1, sz:'1800 Sq Ft', cat:'Apartment', feat:false, feats:['Balcony','Central AC'], amen:['24/7 Security','Parking'], desc:'Prime apartment in Gulberg III with all modern amenities. Walking distance to major hubs.' },
  { title:'Commercial Office Floor in MM Alam Road', city:'Lahore', area:'MM Alam Road', type:'Rent', price:250000, bed:0, bath:4, kit:1, sz:'4000 Sq Ft', cat:'Commercial', feat:false, feats:['Open Plan','Fiber Internet'], amen:['Central AC','Parking'], desc:'Full commercial floor on the prestigious MM Alam Road. Ideal for corporate offices.' },
  { title:'1-Kanal Dream Home in Garden Town', city:'Lahore', area:'Garden Town', type:'Sale', price:95000000, bed:6, bath:5, kit:2, sz:'1 Kanal', cat:'House', feat:true, feats:['Double Story','Lawn','Solar System'], amen:['Generator'], desc:'Grandeur 1-kanal double-storey home in Garden Town with solar energy.' },
  { title:'Studio Apartment near Wapda Town', city:'Lahore', area:'Wapda Town', type:'Rent', price:35000, bed:1, bath:1, kit:1, sz:'650 Sq Ft', cat:'Apartment', feat:false, feats:['Furnished','WiFi'], amen:['Security Guard'], desc:'Compact and fully furnished studio apartment, perfect for professionals.' },
  { title:'7-Marla Corner House in Johar Town', city:'Lahore', area:'Johar Town', type:'Sale', price:37000000, bed:4, bath:3, kit:1, sz:'7 Marla', cat:'House', feat:false, feats:['Corner Plot','Car Porch'], amen:['Sui Gas'], desc:'Corner plot house in Phase 2, Johar Town. Recently renovated.' },
  { title:'Penthouse Apartment in DHA Phase 6', city:'Lahore', area:'DHA Phase 6', type:'Sale', price:45000000, bed:4, bath:3, kit:1, sz:'2800 Sq Ft', cat:'Apartment', feat:true, feats:['Rooftop Terrace','Panoramic Views'], amen:['Concierge','Gym','Pool'], desc:'Exclusive penthouse with breathtaking city views and a private rooftop terrace.' },
  { title:'Brand New 10-Marla House in F-7/1', city:'Islamabad', area:'F-7/1', type:'Sale', price:120000000, bed:5, bath:4, kit:2, sz:'10 Marla', cat:'House', feat:true, feats:['Basement','Solar Panels'], amen:['Generator Backup'], desc:'Newly constructed home in F-7/1. Features a basement and servant quarters.' },
  { title:'Modern Apartment in Blue Area', city:'Islamabad', area:'Blue Area', type:'Rent', price:120000, bed:2, bath:2, kit:1, sz:'1400 Sq Ft', cat:'Apartment', feat:false, feats:['City View','Elevator'], amen:['24/7 Security','Parking'], desc:'Centrally located apartment with stunning views of Islamabad.' },
  { title:'Luxury Villa in Bahria Phase 7', city:'Islamabad', area:'Bahria Phase 7', type:'Sale', price:145000000, bed:6, bath:6, kit:2, sz:'1 Kanal', cat:'Villa', feat:true, feats:['Private Pool','Garden'], amen:['Gated Community'], desc:'Ultra-luxury villa in Bahria Phase 7 — a masterpiece of architecture.' },
  { title:'Commercial Plaza in I-8 Markaz', city:'Islamabad', area:'I-8 Markaz', type:'Sale', price:85000000, bed:0, bath:6, kit:0, sz:'5000 Sq Ft', cat:'Commercial', feat:false, feats:['Multiple Shops','High Foot Traffic'], amen:['Parking'], desc:'Prime commercial plaza in I-8 Markaz. Suitable for retail or bank.' },
  { title:'2-Bedroom Apartment in E-11', city:'Islamabad', area:'E-11/4', type:'Rent', price:75000, bed:2, bath:2, kit:1, sz:'1100 Sq Ft', cat:'Apartment', feat:false, feats:['Balcony','Wooden Flooring'], amen:['Generator'], desc:'Tastefully furnished apartment in E-11/4. Close to schools and parks.' },
  { title:'Corner Plot 8-Marla in G-13', city:'Islamabad', area:'G-13/1', type:'Sale', price:22000000, bed:0, bath:0, kit:0, sz:'8 Marla', cat:'Plot', feat:false, feats:['Facing Park'], amen:[], desc:'Excellent corner plot facing a park in G-13/1 Islamabad.' },
  { title:'Luxury Apartment in Clifton Block 5', city:'Karachi', area:'Clifton Block 5', type:'Rent', price:200000, bed:4, bath:3, kit:1, sz:'3000 Sq Ft', cat:'Apartment', feat:true, feats:['Sea View','Private Elevator'], amen:['Gym','Pool'], desc:'World-class apartment in Clifton Block 5 with a stunning sea view.' },
  { title:'500 Sqyd Bungalow in DHA Phase 8', city:'Karachi', area:'DHA Phase 8', type:'Sale', price:185000000, bed:6, bath:6, kit:2, sz:'500 Sq Yd', cat:'Villa', feat:true, feats:['Private Pool','Cinema Room'], amen:['Generator'], desc:'Statement-making bungalow in DHA Phase 8 — Karachi prestigious address.' },
  { title:'Commercial Unit near Dolmen Mall', city:'Karachi', area:'Clifton', type:'Rent', price:350000, bed:0, bath:2, kit:0, sz:'2200 Sq Ft', cat:'Commercial', feat:false, feats:['Premium Location','Mall Access'], amen:['Mall Security'], desc:'Highly sought-after commercial space near Dolmen Mall.' },
  { title:'Cozy 2-Bed Apartment in Gulshan', city:'Karachi', area:'Gulshan Block 13D', type:'Rent', price:45000, bed:2, bath:2, kit:1, sz:'900 Sq Ft', cat:'Apartment', feat:false, feats:['AC Installed'], amen:['Security Guard'], desc:'Clean and well-maintained apartment. Close to schools and hospitals.' },
  { title:'240 Sqyd House in North Nazimabad', city:'Karachi', area:'North Nazimabad', type:'Sale', price:42000000, bed:4, bath:3, kit:1, sz:'240 Sq Yd', cat:'House', feat:false, feats:['Corner Plot','Basement'], amen:['Generator'], desc:'Well-maintained double-storey house in a well-established neighborhood.' },
  { title:'Studio Flat in DHA Phase 2 Extension', city:'Karachi', area:'DHA Phase 2 Ext', type:'Rent', price:55000, bed:1, bath:1, kit:1, sz:'600 Sq Ft', cat:'Apartment', feat:false, feats:['Furnished','Parking'], amen:['Security'], desc:'Compact furnished studio in DHA Phase 2. Ideal for a professional.' },
  { title:'5-Marla House in Bahria Rawalpindi', city:'Rawalpindi', area:'Bahria Town', type:'Sale', price:18500000, bed:3, bath:2, kit:1, sz:'5 Marla', cat:'House', feat:false, feats:['Marble Floors','Car Porch'], amen:['24/7 Security'], desc:'Affordable and well-designed home in Bahria Town Rawalpindi.' },
  { title:'Office Space in Saddar', city:'Rawalpindi', area:'Saddar', type:'Rent', price:80000, bed:0, bath:2, kit:0, sz:'1500 Sq Ft', cat:'Commercial', feat:false, feats:['Meeting Room'], amen:['Elevators'], desc:'Fully fitted office space in the commercial hub of Saddar.' },
  { title:'10-Marla Plot in DHA Phase 2 RWP', city:'Rawalpindi', area:'DHA Phase 2', type:'Sale', price:34000000, bed:0, bath:0, kit:0, sz:'10 Marla', cat:'Plot', feat:false, feats:['Facing Park'], amen:[], desc:'Prime 10-marla plot on 40-foot road in DHA Phase 2.' },
  { title:'Waterfront Penthouse in Emaar', city:'Karachi', area:'Emaar Crescent Bay', type:'Sale', price:350000000, bed:5, bath:5, kit:2, sz:'5000 Sq Ft', cat:'Apartment', feat:true, feats:['Sea View','Smart Home'], amen:['Beach Access','Infinity Pool'], desc:'Luxury penthouse in Emaar Crescent Bay with sweeping views.' },
  { title:'Farmhouse on Bedian Road', city:'Lahore', area:'Bedian Road', type:'Sale', price:75000000, bed:4, bath:4, kit:2, sz:'4 Kanal', cat:'Villa', feat:true, feats:['Orchard','Swimming Pool'], amen:['Solar System'], desc:'Expansive farmhouse on 4 kanal in the green belt of Lahore.' },
  { title:'Shop in Fortress Square', city:'Lahore', area:'Cantt', type:'Rent', price:150000, bed:0, bath:1, kit:0, sz:'800 Sq Ft', cat:'Commercial', feat:false, feats:['Mall Location'], amen:['Mall Security'], desc:'Prime retail space in Fortress Square, Lahore.' },
  { title:'3-Marla House in Valencia Town', city:'Lahore', area:'Valencia', type:'Sale', price:12500000, bed:2, bath:2, kit:1, sz:'3 Marla', cat:'House', feat:false, feats:['Ground Floor'], amen:['Security'], desc:'Budget-friendly 3-marla house in Valencia Town.' },
  { title:'High-Rise Apartment in Centaurus', city:'Islamabad', area:'F-8', type:'Sale', price:55000000, bed:3, bath:3, kit:1, sz:'2200 Sq Ft', cat:'Apartment', feat:true, feats:['Mall Below','City Views'], amen:['Indoor Pool','Gym'], desc:'Prestigious apartment in The Centaurus with panoramic views.' },
  { title:'1-Kanal Plot in Gulraiz', city:'Rawalpindi', area:'Gulraiz', type:'Sale', price:9500000, bed:0, bath:0, kit:0, sz:'1 Kanal', cat:'Plot', feat:false, feats:['Corner Plot'], amen:[], desc:'Ready-for-construction 1-kanal corner plot in Gulraiz.' },
  { title:'Luxury Apartment in Creek Vista', city:'Karachi', area:'Creek Vista', type:'Rent', price:175000, bed:4, bath:4, kit:1, sz:'3500 Sq Ft', cat:'Apartment', feat:false, feats:['Creek View'], amen:['Pool','Tennis Court'], desc:'Sprawling luxury apartment with stunning Creek views.' },
];

export const autoSeed = async () => {
  try {
    const propertyCount = await Property.countDocuments();
    if (propertyCount > 0) {
      console.log('ℹ️ Database already contains data. Skipping auto-seed.');
      return;
    }

    console.log('🚀 Starting Automated Seeding Process...');

    // 1. Admin
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({ username: 'admin', email: 'admin@estatehub.com', password: hashedPassword, role: 'admin' });
      console.log('✅ Admin account created (admin / admin)');
    }

    // 2. Categories
    const categories = ['House', 'Apartment', 'Commercial', 'Villa', 'Plot'];
    const catDocs = {};
    for (const name of categories) {
      let doc = await PropertyCategory.findOne({ name });
      if (!doc) doc = await PropertyCategory.create({ name, description: `${name} properties` });
      catDocs[name] = doc._id;
    }
    console.log('✅ Categories synchronized');

    // 3. Properties
    for (let i = 0; i < propData.length; i++) {
      const p = propData[i];
      await Property.create({
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
        category_id:   catDocs[p.cat],
        is_featured:   p.feat,
        property_code: 'EST-' + uid(),
        views_count:   Math.floor(Math.random() * 500),
      });
      console.log(`✅ Seeded: ${p.title}`);
    }

    console.log(`\n🎉 Success! ${propData.length} properties have been automatically restored.`);
  } catch (error) {
    console.error('❌ Auto-seed failed:', error.message);
  }
};
