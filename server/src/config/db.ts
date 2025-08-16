// Database connection configuration.
import mongoose from 'mongoose';

/**
 * Asynchronous function to connect to the MongoDB database.
 * It uses the MONGO_URI from environment variables to establish the connection.
 * If the connection fails, the process is exited.
 */
export const connectDB = async (): Promise<void> => {
  try {
    // Get the MongoDB URI from environment variables.
    // The default value is for a local MongoDB instance.
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Husseinberg:Whatever96@cluster0.kyndj9c.mongodb.net/folder-viewer-db?retryWrites=true&w=majority&appName=Cluster0';
    
    // Connect to the database using Mongoose.
    await mongoose.connect(MONGO_URI);
    
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Exit the process with failure if the connection fails.
    process.exit(1);
  }
};
