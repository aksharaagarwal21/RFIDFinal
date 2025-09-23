import mongoose from 'mongoose';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/rfid_university';
  console.log('Using MONGO_URI:', mongoUri);

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    // options can be added if needed
  });

  console.log('Connected to MongoDB');
}
