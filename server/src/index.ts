// --- folder-structure-viewer/server/src/index.ts ---
// Main entry point for the Express application.
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import folderRoutes from './routes/folderRoutes.js';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app.
const app = express();
// Define the port, defaulting to 5000.
const PORT = process.env.PORT || 5000;
// Get the client URL from environment variables for CORS
// In Render, this is provided by the deployment environment.
// For example, https://your-app-name.vercel.app
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Connect to the MongoDB database.
connectDB();

// Configure CORS to explicitly allow your frontend's domain
const corsOptions = {
    origin: CLIENT_URL,
    optionsSuccessStatus: 200 // For legacy browser support
};

// Middleware to enable Cross-Origin Resource Sharing (CORS) for the frontend.
app.use(cors(corsOptions));
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
