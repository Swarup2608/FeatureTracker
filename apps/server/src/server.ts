import dotenv from 'dotenv';
import app from './app';
import connectToDatabase from './config/database';
import { connectToRedis } from './config/redis';
import { PORT } from './config/env';

dotenv.config();

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectToRedis();
    
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();