import mongoose from 'mongoose';

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/estatehub');
  console.log('Connected.');
  const db = mongoose.connection.db;
  const seededEmails = [
    'ahmed.k@estatehub.pk', 
    'sara.m@estatehub.pk', 
    'zain.q@estatehub.pk', 
    'aisha.n@estatehub.pk', 
    'fahad.m@estatehub.pk', 
    'fatima.a@estatehub.pk'
  ];
  const result = await db.collection('agents').deleteMany({ email: { $nin: seededEmails } });
  console.log('Deleted legacy agents count:', result.deletedCount);
  process.exit(0);
}
run();
