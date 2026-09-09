import mongoose from 'mongoose';
import { MONGODB_URI } from './env';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to the database successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1);
  }
};

export default connectToDatabase;