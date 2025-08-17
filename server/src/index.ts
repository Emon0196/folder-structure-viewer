// Main entry point for the Express application.
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import folderRoutes from './routes/folderRoutes.js';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Initialize the Express app.
const app = express();
// Define the port, defaulting to 5000.
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database.
connectDB();

// Middleware to enable Cross-Origin Resource Sharing (CORS) for the frontend.
app.use(cors());
// Middleware to parse JSON request bodies.
app.use(express.json());

// Set up the API routes for folders.
app.use('/api/folders', folderRoutes);

// Simple welcome route to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Folder Structure Viewer API is running.');
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
